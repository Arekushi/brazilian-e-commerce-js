import exec from 'child_process';


export const execShellCommand = (cmd: string): Promise<any> => {
    return new Promise((resolve,) => {
        exec.exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.warn(error);
            }

            resolve(stdout ? stdout : stderr);
        });
    });
};
