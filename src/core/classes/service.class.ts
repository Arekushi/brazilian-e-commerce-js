import { PrismaService } from '@core/services/prisma.service';


export abstract class Service {

    #prisma: PrismaService;
    #name: string;

    get prisma(): PrismaService {
        return this.#prisma;
    }

    get name(): string {
        return this.#name;
    }

    constructor(
        prisma: PrismaService,
        name: string
    ) {
        this.#prisma = prisma;
        this.#name = name;
    }

    async createMany(data: any[], skipDuplicates = false): Promise<void> {
        await this.prisma[this.name].createMany({
            data, skipDuplicates
        });
    }
}
