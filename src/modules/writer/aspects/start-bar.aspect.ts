import Case from 'case';

import { writerBar } from '@core/default/bar.default';
import { Writer } from '@writer/classes/writer.class';
import { Advice, Aspect, AspectContext } from '@arekushii/ts-aspect';


export class StartBarAspect implements Aspect {

    execute(ctx: AspectContext): any {
        const advice = ctx.advice;
        const writer: Writer<any> = ctx.target;
        const icon = ctx.params.icon;
        const map = ctx.returnValue ?? ctx.functionParams[0];
        const methodName = Case.kebab(ctx.params.methodName ?? ctx.methodName);
        const bar = writerBar(icon, methodName, writer.name);
        const total = this.getTotal(map);

        writer.bar = bar;
        bar.start(total, 0);

        switch (advice) {
            case Advice.AfterReturn:
                return map;
            case Advice.Before:
                return [map];
        }
    }

    private getTotal(map: any): number {
        if (Array.isArray(map)) {
            return map.length;
        } else {
            return map.size;
        }
    }
}
