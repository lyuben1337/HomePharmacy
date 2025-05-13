import { Medication } from "./Medication";

export interface Reminder {
  id?: number;
  medicationId: number;
  times: string;
  days: string;
  doseShouldBeTaken: number;
  startDate: string;
  endDate?: string;
  isActive?: boolean;
  notes?: string;
  createdAt?: string;

  medication?: Medication
}