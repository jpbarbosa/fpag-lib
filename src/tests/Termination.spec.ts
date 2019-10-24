import moment from 'moment';
import { precision as p } from './config';
import {
  Termination,
  TerminationCause,
  TerminationNotice
} from '../models/PayrollEvent/Termination';
import { Salary } from '../models/EventRowType/Salary';
import { Inss } from '../models/EventRowType/Inss';
import { Irrf } from '../models/EventRowType/Irrf';
import { ProportionalVacationNoticeWorked } from '../models/EventRowType/ProportionalVacationNoticeWorked';
import { OneThirdAdditionalVacationOnTermination } from '../models/EventRowType/OneThirdAdditionalVacationOnTermination';
import { ThirteenthSalaryNoticeWorked } from '../models/EventRowType/ThirteenthSalaryNoticeWorked';
import { ExpiredVacationOnTermination } from '../models/EventRowType/ExpiredVacationOnTermination';
import { PreviousNoticeIndemnifiedByCompany } from '../models/EventRowType/PreviousNoticeIndemnifiedByCompany';
import { InssOnThirteenthSalary } from '../models/EventRowType/InssOnThirteenthSalary';
import { IrrfOnThirteenthSalary } from '../models/EventRowType/IrrfOnThirteenthSalary';

describe('Termination usage suite', () => {
  describe('should return correct values', () => {
    it('employee request and worked notice', () => {
      const termination = new Termination(3000, {
        date: moment('2019-09-30'),
        admissionDate: moment('2018-01-01'),
        terminationCause: TerminationCause.employeeRequest,
        terminationNotice: TerminationNotice.worked
      });
      termination.run();

      const e = termination;
      expect(e.salary).toBeCloseTo(3000.0);
      expect(e.earnings).toBeCloseTo(8250.0);
      expect(e.deductions).toBeCloseTo(600.71);
      expect(e.netValue).toBeCloseTo(7649.29);
      expect(e.fgts).toBeCloseTo(420.0);

      expect(e.row(Inss)).toBeCloseTo(330.0);
      expect(e.row(Irrf)).toBeCloseTo(57.45);
      expect(e.row(ProportionalVacationNoticeWorked)).toBeCloseTo(2250.0);
      expect(e.row(OneThirdAdditionalVacationOnTermination)).toBeCloseTo(
        750.0,
        p
      );
      expect(e.row(ThirteenthSalaryNoticeWorked)).toBeCloseTo(2250.0);
      expect(e.row(InssOnThirteenthSalary)).toBeCloseTo(202.5);
      expect(e.row(IrrfOnThirteenthSalary)).toBeCloseTo(10.76);
    });
    it('by employer without fair reason, indemnified notice and expired vacation', () => {
      const termination = new Termination(3000, {
        date: moment('2019-09-30'),
        admissionDate: moment('2018-01-01'),
        terminationCause: TerminationCause.byEmployerWithoutFairReason,
        terminationNotice: TerminationNotice.indemnified,
        expiredVacation: true
      });
      termination.run();

      const e = termination;
      expect(e.salary).toBeCloseTo(3000.0);
      expect(e.earnings).toBeCloseTo(14550.0);
      expect(e.deductions).toBeCloseTo(600.71);
      expect(e.netValue).toBeCloseTo(13949.29);
      expect(e.fgts).toBeCloseTo(420.0);

      expect(e.row(ExpiredVacationOnTermination)).toBeCloseTo(3000.0);
      expect(e.row(PreviousNoticeIndemnifiedByCompany)).toBeCloseTo(3300.0);
      expect(e.row(Inss)).toBeCloseTo(330.0);
      expect(e.row(Irrf)).toBeCloseTo(57.45);
      expect(e.row(InssOnThirteenthSalary)).toBeCloseTo(202.5);
      expect(e.row(IrrfOnThirteenthSalary)).toBeCloseTo(10.76);
    });
  });
});
