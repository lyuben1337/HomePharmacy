import { MedicationUnit } from "./MedicationUnit";
import { Reminder } from "./Reminder";

export interface Medication {
    id?: number;
    name: string;
    dosage?: string;
    imageUri?: string;
    recipeUri?: string;
    notes?: string;
    createdAt?: string;

    reminders: Reminder[];
    medicationUnits: MedicationUnit[];
}