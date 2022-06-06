import rand from 'random-seed';


export const randomDate = (start: Date, end: Date, seed: any = new Date()): Date => {
    const random = rand.create(seed);

    return new Date(start.getTime() + random.floatBetween(0, 1) * (end.getTime() - start.getTime()));
};
