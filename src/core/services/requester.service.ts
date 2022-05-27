import { map } from 'rxjs/operators';
import { HTTPOptions } from '@core/interfaces/http-options.interface';
import { HttpService } from '@core/services/http.service';
import { Response } from '@core/interfaces/http-response.interface';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { firstValueFrom } from 'rxjs';
import { LogRequestAspect } from '@core/aspects/log-request.aspect';
import { Injectable } from '@nestjs/common';


@Injectable()
export class RequesterService {
    constructor(
        protected http: HttpService
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
}
