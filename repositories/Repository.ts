import { db } from '@/db/database';
import { camelToSnake, snakeToCamel } from '@/utils/case';

export abstract class Repository<T extends { id?: number }> {
    protected abstract tableName: string;
    protected excludeFields: Array<string> = [];

    protected mapRowToEntity(row: any): any {
        return snakeToCamel(row);
    }

    protected mapEntityToRow(entity: any): any {
        return camelToSnake(entity);
    }

    async getAll(): Promise<T[]> {
        const result = await db().getAllAsync(`SELECT * FROM ${this.tableName}`);
        return result.map(this.mapRowToEntity);
    }

    async getById(id: number): Promise<T | null> {
        const result = await db().getAllAsync(
            `SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`,
            [id]
        );
        return result.length > 0 ? this.mapRowToEntity(result[0]) : null;
    }

    async create(data: Partial<T>): Promise<void> {
        const row = this.mapEntityToRow(data);
        const filteredData = this.filterNonColumnFields(row);
        const keys = Object.keys(filteredData);
        const values = Object.values(filteredData);
        const placeholders = keys.map(() => '?').join(', ');
        const fields = keys.join(', ');

        const query = `INSERT INTO ${this.tableName} (${fields}) VALUES (${placeholders})`;
        await db().runAsync(query, values);
    }

    async update(id: number, data: Partial<T>): Promise<void> {
        const row = this.mapEntityToRow(data);
        const filteredData = this.filterNonColumnFields(row);
        const keys = Object.keys(filteredData);
        const values = Object.values(filteredData);
        const assignments = keys.map(key => `${key} = ?`).join(', ');

        const query = `UPDATE ${this.tableName} SET ${assignments} WHERE id = ?`;
        await db().runAsync(query, [...values, id]);
    }

    async deleteById(id: number): Promise<void> {
        await db().runAsync(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    }

    protected filterNonColumnFields(data: T): Partial<T> {
        const filtered: Partial<T> = {};
        for (const key in data) {
            if (!this.excludeFields.includes(key)) {
                filtered[key] = data[key];
            }
        }

        return filtered;
    }
}