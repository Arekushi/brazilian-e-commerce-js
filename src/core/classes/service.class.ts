import { PrismaService } from '@core/services/prisma.service';


export abstract class Service {

    constructor(
        public readonly prisma: PrismaService,
        public readonly name: string
    ) {
        this.prisma = prisma;
        this.name = name;
    }

    async createMany(data: any[], skipDuplicates = false): Promise<void> {
        await this.prisma[this.name].createMany({
            data, skipDuplicates
        });
    }
}
