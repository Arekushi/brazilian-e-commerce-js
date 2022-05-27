import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


@Controller()
export class TestController {
    constructor(
        private config: ConfigService
    ) { }

    @Get('/test')
    test(): string {
        return 'Test';
    }
}
