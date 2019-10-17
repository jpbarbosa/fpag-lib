import { EventRow } from './EventRow';
import { Employee } from './Employee';

export interface PayrollEvent {
  id: number;
  date: Date;
  salary: number;
  earnings: number;
  deductions: number;
  netValue: number;
  dependents: number;
  employee: Employee;
  eventRows: EventRow[];
}
