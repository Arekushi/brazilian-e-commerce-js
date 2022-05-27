import { PrismaService } from '@core/services/prisma.service';


export abstract class Repository {

    constructor(
        public name: string,
        public prisma: PrismaService
    ) {
        this.name = name;
        this.prisma = prisma;
    }

    async create(input: any): Promise<any> {
        return await this.prisma[this.name].create({
            data: input
        });
    }
}
