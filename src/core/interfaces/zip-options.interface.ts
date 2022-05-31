import { DownloadFile } from '@core/interfaces/download-file.interface';


export interface ZipOptions {
    url: string;
    outputPath: string;
    deleteFile: boolean;
    file: DownloadFile;
}
