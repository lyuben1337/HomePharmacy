export interface MedicationUnit {
    id?: number;
    medicationId: number;
    expirationDate: string;
    doseCount: number;
    notes?: string;
    createdAt?: string;
}
  