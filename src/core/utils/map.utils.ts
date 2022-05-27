export const getByValue = (map: Map<any, any>, searchValue: any): any => {
    for (const [key, value] of map.entries()) {
        if (value === searchValue) {
            return key;
        }
    }
};

export const hasByValue = (map: Map<any, any>, searchValue: any): any => {
    for (const [, value] of map.entries()) {
        if (value === searchValue) {
            return true;
        }
    }

    return false;
};
