import toBoolean from 'to-boolean';
import fs from 'fs';
import path from 'path';

import { CastingContext, parse } from 'csv-parse';
import { HeaderConfig } from '@database/types/header.type';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { ExceptionActionAspect } from '@core/aspects/exception-action.aspect';


export abstract class ReaderCSV<T> {
    #items: Set<T>;
    #headers: string[];

    #integers: Set<string>;
    #floats: Set<string>;
    #dates: Set<string>;
    #booleans: Set<string>;

    get items(): Set<T> {
        return this.#items;
    }

    constructor(
        protected filename: string,
        protected headerConfig: HeaderConfig,
    ) {
        this.filename = filename;
        this.headerConfig = headerConfig;
        this.#headers = [];

        this.#items = new Set();
        this.#integers = new Set();
        this.#floats = new Set();
        this.#dates = new Set();
        this.#booleans = new Set();

        this.setup();
    }

    setup(): void {
        Object.entries(this.headerConfig).forEach(([key, value]) => {
            this.#headers.push(key);

            switch (value) {
            case 'INT':
                this.#integers.add(key);
                break;
            case 'FLOAT':
                this.#floats.add(key);
                break;
            case 'DATE':
                this.#dates.add(key);
                break;
            case 'BOOLEAN':
                this.#booleans.add(key);
                break;
            }
        });
    }

    async read(): Promise<Set<T>> {
        const parser = parse(
            {
                delimiter: ',',
                columns: this.#headers,
                cast: this.cast.bind(this)
            }
        );

        return new Promise((resolve, reject) => {
            this.getReadStream()
                .pipe(parser)
                .on('data', () => {
                    this.data.bind(this);
                })
                .on('end', () => {
                    this.end.bind(this, resolve);
                })
                .on('error', err => {
                    this.error(reject, err);
                });
        });
    }

    data(data: T): void {
        this.#items.add(data);
    }

    end(resolve: any): void {
        resolve(this.#items);
    }

    error(reject: any, err: Error): void {
        reject(err);
    }

    cast(value: string, context: CastingContext): any {
        const column = String(context.column);

        if (this.#integers.has(column)) {
            return parseInt(value, 10);
        }

        if (this.#floats.has(column)) {
            return parseFloat(value);
        }

        if (this.#dates.has(column)) {
            return new Date(value);
        }

        if (this.#booleans.has(column)) {
            return toBoolean(value);
        }

        return value;
    }

    getFilePath(): string {
        return `${path.dirname(require.main.filename)}/../datasets/${ this.filename }`;
    }

    @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    getReadStream(): fs.ReadStream {
        return fs.createReadStream(this.getFilePath(), { encoding: 'utf-8' });
    }

    @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    async getFileContent(): Promise<string> {
        return await fs.promises.readFile(this.getFilePath(), { encoding: 'utf-8' });
    }
}
