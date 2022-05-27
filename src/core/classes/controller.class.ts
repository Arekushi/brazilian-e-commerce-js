import { IRoute } from '@core/interfaces/iroute.interface';
import { Router } from 'express';


export abstract class Controller {

    public router: Router = Router();
    public abstract path: string;
    protected abstract readonly routes: IRoute[];

    setRoutes(): Router {
        for (const route of this.routes) {
            for (const middleware of route.localMiddleware) {
                this.router.use(route.path, middleware);
            }

            try {
                this.router[route.method](route.path, route.handler.bind(this));
            } catch (err) {
                console.error('Not a valid method');
            }
        }

        return this.router;
    }
}
