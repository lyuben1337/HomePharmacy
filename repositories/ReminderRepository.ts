import { Reminder } from "@/models/Reminder";
import { Repository } from "./Repository";
import { db } from "@/db/database";
import { Medication } from "@/models/Medication";

export class ReminderRepository extends Repository<Reminder> {
    protected tableName = "reminder";

    async getAllActive(): Promise<Reminder[]> {
        const result = await db().getAllAsync(
            `SELECT r.*, 
                    m.id as medication_id, 
                    m.name as medication_name, 
                    m.dosage as medication_dosage, 
                    m.image_uri as medication_image_uri, 
                    m.recipe_uri as medication_recipe_uri, 
                    m.notes as medication_notes, 
                    m.created_at as medication_created_at
             FROM ${this.tableName} r
             JOIN medication m ON r.medication_id = m.id
             WHERE r.is_active = 1`
        );

        if (result.length === 0) return [];

        const reminders = result.map((row: any) => {
            const reminder = this.mapRowToEntity(row) as Reminder;

            const medication: Medication = {
                id: row.medication_id,
                name: row.medication_name,
                dosage: row.medication_dosage,
                imageUri: row.medication_image_uri,
                recipeUri: row.medication_recipe_uri,
                notes: row.medication_notes,
                createdAt: row.medication_created_at,
                reminders: [],
                medicationUnits: []
            };

            reminder.medication = medication;
            return reminder;
        });

        return reminders;
    }
}
