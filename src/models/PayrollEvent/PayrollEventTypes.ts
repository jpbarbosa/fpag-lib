import { MonthSalary } from './MonthSalary';
import { Termination } from './Termination';

export type PayrollEventType = typeof MonthSalary | typeof Termination;
