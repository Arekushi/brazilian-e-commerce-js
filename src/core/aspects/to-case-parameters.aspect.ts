import { Case } from '@core/enums/string-case.enum';
import { Aspect, AspectContext } from '@arekushii/ts-aspect';


export class ToCaseParametersAspect implements Aspect {

    execute(ctx: AspectContext): string[] {
        const functionParams = ctx.functionParams;
        const caseParam = ctx.params;

        const strings = functionParams.filter(e => {
            if (typeof e === 'string') {
                return e;
            }
        });

        switch (caseParam) {
            case Case.LOWER:
                return strings.map((str: string) => str.toLocaleLowerCase());

            case Case.UPPER:
                return strings.map((str: string)  => str.toLocaleUpperCase());

            default:
                return strings.map((str: string)  => str.toLocaleLowerCase());
        }
    }
}
