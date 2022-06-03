import { PrismaService } from '@core/services/prisma.service';


export abstract class Service {

    constructor(
        public readonly prisma: PrismaService,
        public readonly name: string
    ) {
        this.prisma = prisma;
        this.name = name;
    }
}
