import fs from 'fs';
import config from 'config';
import toBoolean from 'to-boolean';
import appRoot from 'app-root-path';

import { CastingContext, parse } from 'csv-parse';
import { merge } from '@core/utils/object.util';
import { hasValue } from '@core/utils/array.util';
import { ReaderCSVProps } from '@reader/props/reader-csv.props';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { ExceptionActionAspect } from '@core/aspects/exception-action.aspect';
import { SingleBar } from 'cli-progress';
import { readingBar } from '@core/default/bar.default';
import { StartBarAspect } from '@reader/aspects/start-bar.aspect';
import { StopBarAspect } from '@core/aspects/stop-bar.aspect';
import { IncrementBarAspect } from '@core/aspects/increment-bar.aspect';


export abstract class ReaderCSV<T> {

    #items: T[];

    #headers: string[];
    #integers: string[];
    #floats: string[];
    #dates: string[];
    #booleans: string[];

    #props: ReaderCSVProps;
    #bar: SingleBar;

    get items(): T[] {
        return this.#items;
    }

    get bar(): SingleBar {
        return this.#bar;
    }

    constructor(
        protected props: ReaderCSVProps,
    ) {
        this.#props = props;
        this.#bar = readingBar(this.#props.filename);

        this.#items = [];
        this.#headers = [];
        this.#integers = [];
        this.#floats = [];
        this.#dates = [];
        this.#booleans = [];

        this.setup();
    }

    setup(): void {
        Object.entries(this.#props.columns).forEach(([key, value]) => {
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
            return this.readPromise();
        }
    }

    @UseAspect(Advice.Before, StartBarAspect)
    private async readPromise(): Promise<T[]> {
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

    @UseAspect(Advice.Before, IncrementBarAspect)
    data(data: T): void {
        this.#items.push(data);
    }

    @UseAspect(Advice.Before, StopBarAspect)
    end(resolve: any): void {
        resolve(this.#items);
    }

    @UseAspect(Advice.Before, StopBarAspect)
    error(reject: any, err: Error): void {
        reject(err);
    }

    cast(value: string, context: CastingContext): unknown {
        const column = String(context.column);

        if (this.#integers.includes(column)) {
            return parseInt(value, 10) || 0;
        }

        if (this.#floats.includes(column)) {
            return parseFloat(value)|| 0;
        }

        if (this.#dates.includes(column)) {
            return new Date(value) || value;
        }

        if (this.#booleans.includes(column)) {
            return toBoolean(value) || false;
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

    getLength(): number {
        const buffer = fs.readFileSync(this.getFilePath(), 'utf8');
        return buffer.split('\n').length - 2;
    }
}
