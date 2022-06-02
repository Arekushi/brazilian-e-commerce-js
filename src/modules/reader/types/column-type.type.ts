const dataTypes = [
    'STRING',
    'INT',
    'FLOAT',
    'DATE',
    'BOOLEAN'
] as const;

export type ColumnType = typeof dataTypes[number];
