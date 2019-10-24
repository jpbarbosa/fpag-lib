import { PayrollEvent, PayrollEventOptions } from '.';
import { ThirteenthSalary as ThirteenthSalaryEventRowType } from '../../models/EventRowType/ThirteenthSalary';
import { ThirteenthSalaryAdvanceDeduction } from '../../models/EventRowType/ThirteenthSalaryAdvanceDeduction';
import { InssOnThirteenthSalary } from '../../models/EventRowType/InssOnThirteenthSalary';
import { IrrfOnThirteenthSalary } from '../../models/EventRowType/IrrfOnThirteenthSalary';

const thirteenthSalaryRows = [
  ThirteenthSalaryEventRowType,
  ThirteenthSalaryAdvanceDeduction,
  InssOnThirteenthSalary,
  IrrfOnThirteenthSalary
];

export class ThirteenthSalary extends PayrollEvent {
  constructor(public salary: number, public options: PayrollEventOptions = {}) {
    super(salary, thirteenthSalaryRows, options);
  }
}
