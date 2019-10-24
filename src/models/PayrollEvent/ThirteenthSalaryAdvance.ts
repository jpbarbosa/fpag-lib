import { PayrollEvent, PayrollEventOptions } from '.';
import { ThirteenthSalaryAdvance as ThirteenthSalaryAdvanceEventRowType } from '../../models/EventRowType/ThirteenthSalaryAdvance';

const thirteenthSalaryRows = [ThirteenthSalaryAdvanceEventRowType];

export class ThirteenthSalaryAdvance extends PayrollEvent {
  constructor(public salary: number, public options: PayrollEventOptions = {}) {
    super(salary, thirteenthSalaryRows, options);
  }
}
