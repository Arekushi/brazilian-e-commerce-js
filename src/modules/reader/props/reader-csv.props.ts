import { Column } from '@reader/types/column.type';
import { Options } from 'csv-parse';


export interface ReaderCSVProps {
    filename: string;
    columns: Column;
    options?: Options;
    filePath?: string;
}
