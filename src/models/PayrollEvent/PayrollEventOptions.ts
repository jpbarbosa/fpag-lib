import { Moment } from 'moment';
import { TerminationCause, TerminationNotice } from './Termination';

export interface PayrollEventOptions {
  employeeId?: number;
  dependents?: number;
  date?: Moment;
  admissionDate?: Moment;
  terminationCause?: TerminationCause;
  terminationNotice?: TerminationNotice;
  expiredVacation?: boolean;
}
