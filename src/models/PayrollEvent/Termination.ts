import { PayrollEvent, PayrollEventOptions } from '.';
import { Salary } from '../EventRowType/Salary';
import { Inss } from '../EventRowType/Inss';
import { Irrf } from '../EventRowType/Irrf';
import { ProportionalVacationNoticeWorked } from '../EventRowType/ProportionalVacationNoticeWorked';
import { OneThirdAdditionalVacationOnTermination } from '../EventRowType/OneThirdAdditionalVacationOnTermination';
import { ThirteenthSalaryNoticeWorked } from '../EventRowType/ThirteenthSalaryNoticeWorked';
import { ExpiredVacationOnTermination } from '../EventRowType/ExpiredVacationOnTermination';
import { PreviousNoticeIndemnifiedByCompany } from '../EventRowType/PreviousNoticeIndemnifiedByCompany';
import { InssOnThirteenthSalary } from '../EventRowType/InssOnThirteenthSalary';
import { IrrfOnThirteenthSalary } from '../EventRowType/IrrfOnThirteenthSalary';

export enum TerminationCause {
  employeeRequest = 'Employee Request',
  byEmployerWithFairReason = 'By Employer With Fair Reason',
  byEmployerWithoutFairReason = 'By Employer Without Fair Reason'
}

export type TerminationCauseKey = keyof typeof TerminationCause;

export enum TerminationNotice {
  worked = 'Worked',
  indemnified = 'Indemnified'
}

export type TerminationNoticeKey = keyof typeof TerminationNotice;

const terminationRows = [
  Salary,
  Inss,
  Irrf,
  ProportionalVacationNoticeWorked,
  OneThirdAdditionalVacationOnTermination,
  ThirteenthSalaryNoticeWorked,
  ExpiredVacationOnTermination,
  PreviousNoticeIndemnifiedByCompany,
  InssOnThirteenthSalary,
  IrrfOnThirteenthSalary
];

export class Termination extends PayrollEvent {
  constructor(public salary: number, public options: PayrollEventOptions = {}) {
    super(salary, terminationRows, options);
  }

  public getMinNoticeDays(): number {
    const { date, admissionDate } = this.options;
    if (!date || !admissionDate) {
      throw new Error('Event date and admissionDate must be set');
    }
    const yearDiff = date.diff(admissionDate, 'years');
    return 30 + yearDiff * 3;
  }
}
