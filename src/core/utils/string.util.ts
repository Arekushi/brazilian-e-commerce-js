export const toArray = (str: string): any[] => {
    return str as unknown as any[];
};

export const compare = (a: string, b: string): boolean => {
    return a.localeCompare(b, undefined, { sensitivity: 'accent'}) === 0;
};

export const isEmptyOrSpaces = (str: string): boolean => {
    return str === null || str === undefined || str.match(/^ *$/) !== null;
};

export const onlyAlpha =(str: string): string => {
    return str.replace(/[^a-zA-Z0-9]/g, '');
};

export const onlyNumbers = (str: string): string => {
    return str.replace(/\D/g, '');
};
