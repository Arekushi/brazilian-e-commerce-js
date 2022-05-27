import consola from 'consola';
import { App } from '@src/app';


export const run = async (): Promise<void> => {
    const app = new App();

    await app.init();
    await app.listen();
};

run().catch(
    () => {
        consola.error('Error!');
    }
);
