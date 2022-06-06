import rand from 'random-seed';


export const randomGender = (seed: any = new Date()): string => {
    const random = rand.create(seed);
    return random.random() > 0.5 ? 'F' : 'M';
};
