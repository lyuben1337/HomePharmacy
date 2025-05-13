export interface IntakeHistory {
    id?: number;
    medicationId: number;
    takenAt?: string;
    scheduledAt: string;
    source?: string;
    doseTaken?: number;             
    notes?: string;               
    createdAt?: string;
}
  