import { SingleBar } from 'cli-progress';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class StopBarAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const target = ctx.target;
        const bar: SingleBar = target.bar;

        bar.stop();
    }
}
