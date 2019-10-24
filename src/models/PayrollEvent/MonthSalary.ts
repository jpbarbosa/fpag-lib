import { PayrollEvent, PayrollEventOptions } from '.';
import { Salary } from '../../models/EventRowType/Salary';
import { Inss } from '../../models/EventRowType/Inss';
import { Irrf } from '../../models/EventRowType/Irrf';

const monthSalaryRows = [Salary, Inss, Irrf];

export class MonthSalary extends PayrollEvent {
  constructor(public salary: number, public options: PayrollEventOptions = {}) {
    super(salary, monthSalaryRows, options);
  }
}
