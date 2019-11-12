import { User } from './User';
import { Employee } from './Employee';
import { PayrollEvent } from './PayrollEvent';

export interface NewTenant {
  name: string;
  users: User[];
  employees: Employee[];
  payrollEvents: PayrollEvent[];
}

export interface Tenant extends NewTenant {
  id: number;
}
