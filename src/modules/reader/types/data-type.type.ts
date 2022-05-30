const dataTypes = [
    'STRING',
    'INT',
    'FLOAT',
    'DATE',
    'BOOLEAN'
] as const;

export type DataType = typeof dataTypes[number];
