import consola from 'consola';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogDownloadAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const method = 'DOWNLOAD FILE';
        const file = ctx.functionParams[1];
        const date = new Date().toTimeString();

        consola.info(`${method} - ${file.filename} - ${date}`);
    }
}
