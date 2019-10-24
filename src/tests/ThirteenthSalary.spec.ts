import { ThirteenthSalaryAdvance } from '../models/PayrollEvent/ThirteenthSalaryAdvance';
import { ThirteenthSalary } from '../models/PayrollEvent/ThirteenthSalary';
import { InssOnThirteenthSalary } from '../models/EventRowType/InssOnThirteenthSalary';
import { IrrfOnThirteenthSalary } from '../models/EventRowType/IrrfOnThirteenthSalary';

describe('Thirteenth Salary event usage suite', () => {
  describe('employee salary is 3000', () => {
    it('advance', () => {
      const payrollEvent = new ThirteenthSalaryAdvance(3000);
      payrollEvent.run();

      const inss = payrollEvent.eventRowCollection.findRow(
        InssOnThirteenthSalary
      );
      const irrf = payrollEvent.eventRowCollection.findRow(
        IrrfOnThirteenthSalary
      );

      const e = payrollEvent;
      expect(e.salary).toBeCloseTo(3000.0);
      expect(e.earnings).toBeCloseTo(1500.0);
      expect(e.deductions).toBeCloseTo(0.0);
      expect(e.netValue).toBeCloseTo(1500.0);
      expect(e.fgts).toBeCloseTo(0.0);
      expect(inss).toBeUndefined;
      expect(irrf).toBeUndefined;
    });

    it('advance', () => {
      const payrollEvent = new ThirteenthSalary(3000);
      payrollEvent.run();

      const inssOnThirteenthSalary = payrollEvent.eventRowCollection.findRow(
        InssOnThirteenthSalary
      );
      const irrfOnThirteenthSalary = payrollEvent.eventRowCollection.findRow(
        IrrfOnThirteenthSalary
      );

      const e = payrollEvent;
      expect(e.salary).toBeCloseTo(3000.0);
      expect(e.earnings).toBeCloseTo(3000.0);
      expect(e.deductions).toBeCloseTo(1887.45);
      expect(e.netValue).toBeCloseTo(1112.55);
      expect(e.fgts).toBeCloseTo(240.0);
      expect(
        inssOnThirteenthSalary && inssOnThirteenthSalary.value
      ).toBeCloseTo(330.0);
      expect(
        irrfOnThirteenthSalary && irrfOnThirteenthSalary.value
      ).toBeCloseTo(57.45);
    });
  });
});
