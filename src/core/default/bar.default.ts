import i18n from 'i18n';
import chalk from 'chalk';

import { SingleBar } from 'cli-progress';


export const readingBar = (
    filename: string
): SingleBar => {
    const format = `📃 ${chalk.bold.rgb(40, 42, 54).bgRgb(124, 209, 119)
        (i18n.__('progress-bar.reading', { filename }))
    }`;

    return new SingleBar({
        format,
        align: 'left',
        hideCursor: true,
        barCompleteChar: '\u25A0',
        barIncompleteChar: ' '
    });
};

export const writerBar = (
    icon: string,
    methodName: string,
    entity: string
): SingleBar => {
    const format = `${icon} ${chalk.bold.rgb(40, 42, 54).bgRgb(124, 209, 119)
        (i18n.__('progress-bar.writer', { methodName, entity }))
    }`;

    return new SingleBar({
        format,
        align: 'left',
        hideCursor: true,
        barCompleteChar: '\u25A0',
        barIncompleteChar: ' '
    });
};
