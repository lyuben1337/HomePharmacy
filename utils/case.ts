export function snakeToCamel(row: Record<string, any>) {
    const result: Record<string, any> = {};

    for (const key in row) {
        const camelKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
        result[camelKey] = row[key];
    }

    return result;
}

export function camelToSnake(row: Record<string, any>) {
    const result: Record<string, any> = {};

    for (const key in row) {
        const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        result[snakeKey] = row[key];
    }

    return result;
}