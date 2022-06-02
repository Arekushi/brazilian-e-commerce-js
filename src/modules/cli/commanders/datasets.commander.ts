import config from 'config';

import { Command } from 'nestjs-command';
import { LogCommandAspect } from '@cli/aspects/log-command.aspect';
import { UseAspect, Advice } from '@arekushii/ts-aspect';
import { Commander } from '@cli/classes/commander.class';
import { ZipOptions } from '@core/interfaces/zip-options.interface';
import { RequesterService } from '@core/services/requester.service';
import { UnzipService } from '@core/services/unzip.service';
import { Injectable } from '@nestjs/common';


@Injectable()
export class DatasetsCommander extends Commander {

    constructor(
        private readonly requester: RequesterService,
        private readonly unzip: UnzipService
    ) {
        super('datasets');
    }

    @Command({
        command: 'download:datasets',
        describe: 'Download the necessary datasets and place them in the datasets folder',
    })
    @UseAspect(Advice.Before, LogCommandAspect)
    @UseAspect(Advice.After, LogCommandAspect)
    async download(): Promise<void> {
        const zip: ZipOptions = config.util.toObject(config.get('datasets.zip'));

        await this.requester.downloadFile(zip.url, zip.file);
        await this.unzip.unzip(zip);
    }
}
