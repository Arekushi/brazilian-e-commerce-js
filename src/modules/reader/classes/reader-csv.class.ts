import fs from 'fs';
import config from 'config';
import toBoolean from 'to-boolean';
import appRoot from 'app-root-path';

import { merge } from '@core/utils/object.util';
import { hasValue } from '@core/utils/array.util';
import { ReaderCSVProps } from '@reader/props/reader-csv.props';
import { CastingContext, parse } from 'csv-parse';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { ExceptionActionAspect } from '@core/aspects/exception-action.aspect';


export abstract class ReaderCSV<T> {

    #items: T[];

    #headers: string[];
    #integers: string[];
    #floats: string[];
    #dates: string[];
    #booleans: string[];

    #props: ReaderCSVProps;

    get items(): T[] {
        return this.#items;
    }

    constructor(
        protected props: ReaderCSVProps,
    ) {
        this.#props = props;

        this.#items = [];
        this.#headers = [];
        this.#integers = [];
        this.#floats = [];
        this.#dates = [];
        this.#booleans = [];

        this.setup();
    }

    setup(): void {
        Object.entries(this.#props.header).forEach(([key, value]) => {
            this.#headers.push(key);

            switch (value) {
                case 'INT':
                    this.#integers.push(key);
                    break;
                case 'FLOAT':
                    this.#floats.push(key);
                    break;
                case 'DATE':
                    this.#dates.push(key);
                    break;
                case 'BOOLEAN':
                    this.#booleans.push(key);
                    break;
            }
        });

        this.#props = merge(
            this.#props, config.util.toObject(config.get('reader'))
        );

        this.#props.options = merge(
            {
                columns: this.#headers,
                cast: this.cast.bind(this)
            },
            this.#props.options
        );
    }

    async read(update = false): Promise<T[]> {
        if (hasValue(this.#items) && !update) {
            return new Promise((resolve,) => {
                resolve(this.#items);
            });
        } else {
            return new Promise((resolve, reject) => {
                this.getReadStream()
                    .pipe(parse(this.#props.options))
                    .on('data', (data) => {
                        this.data(data);
                    })
                    .on('end', () => {
                        this.end(resolve);
                    })
                    .on('error', err => {
                        this.error(reject, err);
                    });
            });
        }
    }

    data(data: T): void {
        this.#items.push(data);
    }

    end(resolve: any): void {
        resolve(this.#items);
    }

    error(reject: any, err: Error): void {
        reject(err);
    }

    cast(value: string, context: CastingContext): any {
        const column = String(context.column);

        if (this.#integers.includes(column)) {
            return parseInt(value, 10);
        }

        if (this.#floats.includes(column)) {
            return parseFloat(value);
        }

        if (this.#dates.includes(column)) {
            return new Date(value);
        }

        if (this.#booleans.includes(column)) {
            return toBoolean(value);
        }

        return value;
    }

    @UseAspect(Advice.TryCatch, ExceptionActionAspect)
    getReadStream(): fs.ReadStream {
        return fs.createReadStream(this.getFilePath(), { encoding: 'utf-8' });
    }

    getFilePath(): string {
        return `${appRoot}/${this.#props.filePath}/${this.#props.filename}`;
    }
}
