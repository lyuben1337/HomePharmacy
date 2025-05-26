import { Medication } from '@/models/Medication';
import { Repository } from './Repository';
import { db } from '@/db/database';

export class MedicationRepository extends Repository<Medication> {
    protected override tableName = 'medication';
    protected override excludeFields = ['reminders', 'medication_units'];

    override async getById(id: number): Promise<Medication | null> {
        const result = await db().getAllAsync(
            `SELECT * FROM ${this.tableName} WHERE id = ? LIMIT 1`,
            [id]
        );

        if (result.length === 0) return null;

        const medication = this.mapRowToEntity(result[0]);

        const units = await db().getAllAsync(
            `SELECT * FROM medication_unit WHERE medication_id = ?`,
            [id]
        );
        medication.medicationUnits = units.map(this.mapRowToEntity);

        const reminders = await db().getAllAsync(
            `SELECT * FROM reminder WHERE medication_id = ?`,
            [id]
        );
        medication.reminders = reminders.map(this.mapRowToEntity);

        return medication;
    }
    async addUnit(
        medicationId: number,
        unit: { expiration_date: string; doseCount: number }
    ) {
        await db().runAsync(
            `INSERT INTO medication_unit (medication_id, expiration_date, dose_count)
     VALUES (?, ?, ?)`,
            [medicationId, unit.expiration_date, unit.doseCount]
        );
    }


    async deleteUnit(unitId: number) {
        await db().runAsync(`DELETE FROM medication_unit WHERE id = ?`, [unitId]);
    }

}
