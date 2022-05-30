import { HeaderConfig } from '@reader/types/header.type';
import { Options } from 'csv-parse';


export interface ReaderCSVProps {
    filename: string;
    header: HeaderConfig;
    options?: Options;
    filePath?: string;
}
