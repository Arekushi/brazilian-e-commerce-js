import i18n from 'i18n';
import Case from 'case';
import consola from 'consola';

import { Advice, Aspect, AspectContext } from '@arekushii/ts-aspect';
import { style } from '@open-tech-world/ansi-styles';
import { Writer } from '@writer/classes/writer.class';


export class LogWriterAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const writer: Writer<any> = ctx.target;
        const advice = ctx.advice;
        const name = writer.name;
        const methodName = Case.kebab(ctx.methodName);
        const date = new Date().toLocaleTimeString();
        const suffix = this.getSuffix(advice);

        consola.log(style(
            i18n.__(`logs.writer.${suffix}`, {
                methodName,
                date,
                name
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
