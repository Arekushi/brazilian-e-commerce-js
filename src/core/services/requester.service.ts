import * as stream from 'stream';
import appRoot from 'app-root-path';

import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
import { createWriteStream } from 'fs';
import { DownloadFile } from '@core/interfaces/download-file.interface';
import { HTTPOptions } from '@core/interfaces/http-options.interface';
import { HttpService } from '@core/services/http.service';
import { Response } from '@core/interfaces/http-response.interface';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { LogRequestAspect } from '@core/aspects/log-request.aspect';
import { LogDownloadAspect } from '@core/aspects/log-download.aspect';
import { Injectable } from '@nestjs/common';
import { deleteCreatePath } from '@core/utils/fs.util';
import { promisify } from 'util';


@Injectable()
export class RequesterService {
    constructor(
        public http: HttpService
    ) {
        this.http = http;
    }

    @UseAspect(Advice.Before, LogRequestAspect, { method: 'GET' })
    get<T>(route: string, options?: HTTPOptions, data = true): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.get<T>(`${route}`, options).pipe(
                map(res => data ? res : res.data)
            )
        );
    }

    @UseAspect(Advice.Before, LogRequestAspect, { method: 'POST' })
    post<T>(route: string, body?: any, options?: HTTPOptions, data = true): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.post<T>(`${route}`, body, options).pipe(
                map(res => data ? res : res.data)
            )
        );
    }

    @UseAspect(Advice.Before, LogRequestAspect, { method: 'PUT' })
    put<T>(route: string, body: any, options?: HTTPOptions, data = true): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.put<T>(`${route}`, body, options).pipe(
                map(res => data ? res : res.data)
            )
        );
    }

    @UseAspect(Advice.Before, LogRequestAspect, { method: 'DELETE' })
    delete<T>(route: string, options?: HTTPOptions, data = true): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.delete<T>(`${route}`, options).pipe(
                map(res => data ? res : res.data)
            )
        );
    }

    @UseAspect(Advice.Before, LogRequestAspect, { method: 'PATCH' })
    patch<T>(route: string, body: any, options?: HTTPOptions, data = true): Promise<Response<T> | T> {
        return firstValueFrom(
            this.http.patch<T>(`${route}`, body, options).pipe(
                map(res => data ? res.data : res)
            )
        );
    }

    @UseAspect(Advice.Before, LogDownloadAspect)
    async downloadFile(
        route: string,
        file: DownloadFile
    ): Promise<string> {
        const path = `${appRoot}/${file.outputPath}`;
        const filePath = `${path}/${file.filename}`;
        const options: HTTPOptions = {
            responseType: 'stream'
        };

        await deleteCreatePath(path);

        const data = await firstValueFrom(
            this.http.get<any>(`${route}`, options).pipe(
                map(res => {
                    return res.data;
                })
            )
        );

        await promisify(stream.pipeline)(data, createWriteStream(filePath));
        return filePath;
    }
}
