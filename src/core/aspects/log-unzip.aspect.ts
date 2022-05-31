import consola from 'consola';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { ZipOptions } from '@core/interfaces/zip-options.interface';


export class LogUnzipAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const zip: ZipOptions = ctx.functionParams[0];
        const date = new Date().toTimeString();

        consola.info(`${zip.file.filename} - has been unzipped - ${date}`);
    }
}
