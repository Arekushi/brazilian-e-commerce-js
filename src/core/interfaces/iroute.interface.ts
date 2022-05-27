import { Methods } from '@core/enums/http-methods.enum';
import { NextFunction, Request, Response } from 'express';


export interface IRoute {
    path: string;
    method: Methods;
    handler: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => Response | Promise<Response> | void | Promise<void>;
    localMiddleware: ((
        req: Request,
        res: Response,
        next: NextFunction
    ) => void)[];
}
