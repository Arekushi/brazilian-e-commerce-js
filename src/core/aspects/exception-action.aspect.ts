import { runException } from '@core/utils/exception.util';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class ExceptionActionAspect implements Aspect {

    async execute(ctx: AspectContext): Promise<void> {
        await runException(ctx.error);

        if (ctx.params) {
            throw ctx.error;
        }
    }
}
