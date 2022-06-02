import { SingleBar } from 'cli-progress';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class IncrementBarAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const target = ctx.target;
        const bar: SingleBar = target.bar;

        bar.increment();
    }
}
