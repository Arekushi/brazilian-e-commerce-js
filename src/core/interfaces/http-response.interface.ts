import { AxiosResponseHeaders } from 'axios';


export interface Response<T> {
    ok: boolean;
    statusCode: number;
    statusText: string;
    headers?: AxiosResponseHeaders;
    data?: T;
    message?: string;
    name?: string;
}
