import i18n from 'i18n';
import consola from 'consola';

import { style } from '@open-tech-world/ansi-styles';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';
import { ZipOptions } from '@core/interfaces/zip-options.interface';


export class LogUnzipAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const zip: ZipOptions = ctx.functionParams[0];
        const date = new Date().toLocaleTimeString();
        const filename = zip.file.filename;

        consola.log(style(
            i18n.__('logs.unzip', {
                file: filename,
                date
            }
        )));
    }
}
