import i18n from 'i18n';
import Case from 'case';
import consola from 'consola';

import { Commander } from '@cli/classes/commander.class';
import { Advice, Aspect, AspectContext } from '@arekushii/ts-aspect';
import { style } from '@open-tech-world/ansi-styles';


export class LogCommandAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const advice = ctx.advice;
        const commander: Commander = ctx.target;
        const commanderName = Case.kebab(commander.name).toLocaleLowerCase();
        const methodName = Case.kebab(ctx.methodName);
        const date = new Date().toLocaleTimeString();
        const suffix = this.getSuffix(advice);

        consola.log(style(
            i18n.__(`logs.commander.${suffix}`, {
                method: `${methodName}:${commanderName}`,
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
