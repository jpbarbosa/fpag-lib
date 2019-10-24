import { precision } from './config';
import { PayrollEvent } from '../models/PayrollEvent';
import { Salary } from '../models/EventRowType/Salary';
import { Inss } from '../models/EventRowType/Inss';
import { Irrf } from '../models/EventRowType/Irrf';
import { OtherDiscount } from '../models/EventRowType/OtherDiscount';

describe('Payroll event usage suite', () => {
  describe('general properties and methods', () => {
    const payrollEvent = new PayrollEvent(1000, [Salary, Inss, Irrf]);
    payrollEvent.run();

    it('should not change private property', () => {
      expect(() => ((payrollEvent as any).earnings = 100)).toThrowError();
    });
  });

  describe('should return correct values', () => {
    it('employee salary of 2000', () => {
      const payrollEvent = new PayrollEvent(2000, [Salary, Inss, Irrf]);
      payrollEvent.run();

      const inss = payrollEvent.eventRowCollection.findRow(Inss);
      const irrf = payrollEvent.eventRowCollection.findRow(Irrf);

      const e = payrollEvent;
      expect(e.salary).toBeCloseTo(2000.0, precision);
      expect(e.earnings).toBeCloseTo(2000.0, precision);
      expect(e.deductions).toBeCloseTo(180.0, precision);
      expect(e.netValue).toBeCloseTo(1820.0, precision);
      expect(e.fgts).toBeCloseTo(160.0, precision);
      expect(inss && inss.value).toBeCloseTo(180.0, precision);
      expect(irrf && irrf.value).toBeCloseTo(0.0, precision);
    });

    it('employee salary of 3000', () => {
      const payrollEvent = new PayrollEvent(3000, [Salary, Inss, Irrf]);
      payrollEvent.run();

      const inss = payrollEvent.eventRowCollection.findRow(Inss);
      const irrf = payrollEvent.eventRowCollection.findRow(Irrf);

      const e = payrollEvent;
      expect(e.salary).toBeCloseTo(3000.0, precision);
      expect(e.earnings).toBeCloseTo(3000.0, precision);
      expect(e.deductions).toBeCloseTo(387.45, precision);
      expect(e.netValue).toBeCloseTo(2612.55, precision);
      expect(e.fgts).toBeCloseTo(240.0, precision);
      expect(inss && inss.value).toBeCloseTo(330.0, precision);
      expect(irrf && irrf.value).toBeCloseTo(57.45, precision);
    });

    it('employee salary of 3000 with 1 dependent', () => {
      const payrollEvent = new PayrollEvent(3000, [Salary, Inss, Irrf], {
        dependents: 1
      });
      payrollEvent.run();

      const inss = payrollEvent.eventRowCollection.findRow(Inss);
      const irrf = payrollEvent.eventRowCollection.findRow(Irrf);

      const e = payrollEvent;
      expect(e.salary).toBeCloseTo(3000.0, precision);
      expect(e.earnings).toBeCloseTo(3000.0, precision);
      expect(e.deductions).toBeCloseTo(373.23, precision);
      expect(e.netValue).toBeCloseTo(2626.77, precision);
      expect(e.fgts).toBeCloseTo(240.0, precision);
      expect(inss && inss.value).toBeCloseTo(330.0, precision);
      expect(irrf && irrf.value).toBeCloseTo(43.23, precision);
    });

    it('employee salary of 3000 with 1 dependent and 100 of other discounts', () => {
      const payrollEvent = new PayrollEvent(3000, [Salary, Inss, Irrf], {
        dependents: 1
      });
      payrollEvent.eventRowCollection.addRow(OtherDiscount, 10);
      payrollEvent.run();

      const inss = payrollEvent.eventRowCollection.findRow(Inss);
      const irrf = payrollEvent.eventRowCollection.findRow(Irrf);

      const e = payrollEvent;
      expect(e.salary).toBeCloseTo(3000.0, precision);
      expect(e.earnings).toBeCloseTo(3000.0, precision);
      expect(e.deductions).toBeCloseTo(383.23, precision);
      expect(e.netValue).toBeCloseTo(2616.77, precision);
      expect(e.fgts).toBeCloseTo(240.0, precision);
      expect(inss && inss.value).toBeCloseTo(330.0, precision);
      expect(irrf && irrf.value).toBeCloseTo(43.23, precision);
    });
  });
});
