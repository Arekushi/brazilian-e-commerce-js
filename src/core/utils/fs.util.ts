import fs from 'fs-extra';
import rimraf from 'rimraf';
import consola from 'consola';
import { promisify } from 'util';

const rimrafPromise = promisify(rimraf);


export const deleteCreatePath = async (path: string): Promise<void> => {
    if (await fs.pathExists(path)) {
        await deletePath(path);
    }

    await createPath(path);
};

export const createPath = async (path: string): Promise<void> => {
    try {
        await fs.ensureDir(path);
    } catch (err) {
        console.error(err);
    }
};

export const deletePath = async (path: string): Promise<void> => {
    await fs.promises.access(path);
    await rimrafPromise(path);
};

export const deleteFile = (path: string): void => {
    fs.remove(path, () => {});
};
