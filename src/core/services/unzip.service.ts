import AdmZip from 'adm-zip';
import appRoot from 'app-root-path';

import { ZipOptions } from '@core/interfaces/zip-options.interface';
import { Injectable } from '@nestjs/common';
import { Advice, UseAspect } from '@arekushii/ts-aspect';
import { LogUnzipAspect } from '@core/aspects/log-unzip.aspect';
import { deleteCreatePath, deleteFile as df } from '@core/utils/fs.util';


@Injectable()
export class UnzipService {

    @UseAspect(Advice.After, LogUnzipAspect)
    async unzip(zip: ZipOptions): Promise<void> {
        const { file, outputPath, deleteFile } = zip;
        const path = `${appRoot}/${outputPath}`;
        const filePath = `${path}/${file.filename}`;
        const directory = new AdmZip(filePath);

        await deleteCreatePath(path);

        return new Promise((resolve,) => {
            directory.extractAllToAsync(path, true, true, (err) => {
                if (deleteFile) {
                    df(filePath);
                }

                resolve();
            });
        });
    }
}
