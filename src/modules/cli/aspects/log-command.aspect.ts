import Case from 'case';
import consola from 'consola';
import { Advice, Aspect, AspectContext } from '@arekushii/ts-aspect';


export class LogCommandAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const advice = ctx.advice;
        const commanderName = ctx.target.name;
        const methodName = Case.kebab(ctx.methodName);
        const date = new Date().toTimeString();
        const prefix = this.getPrefix(advice);

        consola.info(
            `${prefix} - ${methodName}:${commanderName} - ${date}`
        );
    }

    private getPrefix(advice: Advice): string {
        switch(advice) {
            case Advice.Before:
                return 'Starting';
            case Advice.After:
                return 'Ending';
        }
    }
}
