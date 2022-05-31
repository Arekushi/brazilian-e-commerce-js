import { hasValue } from '@core/utils/array.util';
import { Writer } from '@writer/classes/writer.class';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class CheckDataAspect implements Aspect {

    execute(ctx: AspectContext): void {
        const writer: Writer<any> = ctx.target;
        const items: any[] = ctx.functionParams[0];

        if (!hasValue(writer.data)) {
            writer.data = writer.map(items);
        }
    }
}
