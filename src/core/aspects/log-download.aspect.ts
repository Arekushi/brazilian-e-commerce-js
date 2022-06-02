import i18n from 'i18n';
import consola from 'consola';

import { style } from '@open-tech-world/ansi-styles';
import { Aspect, AspectContext, Advice } from '@arekushii/ts-aspect';
import { DownloadFile } from '@core/interfaces/download-file.interface';


export class LogDownloadAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const advice = ctx.advice;
        const file: DownloadFile = ctx.functionParams[1];
        const date = new Date().toLocaleTimeString();
        const suffix = this.getSuffix(advice);

        consola.log(style(
            i18n.__(`logs.download-file.${suffix}`, {
                file: file.filename,
                date
            }
        )));
    }

    private getSuffix(advice: Advice): string {
        switch(advice) {
            case Advice.Before:
                return 'start';
            case Advice.After:
                return 'end';
        }
    }
}
