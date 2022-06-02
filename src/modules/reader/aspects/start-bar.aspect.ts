import { ReaderCSV } from '@reader/classes/reader-csv.class';
import { SingleBar } from 'cli-progress';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class StartBarAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const reader: ReaderCSV<any> = ctx.target;
        const bar: SingleBar = reader.bar;
        const total = reader.getLength();

        bar.start(total, 0);
    }
}
