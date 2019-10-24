import { precision } from './config';
import { Inss } from '../models/EventRowType/Inss';
import { PayrollEvent } from '../models/PayrollEvent';

describe('Inss usage suite', () => {
  describe('general properties and methods', () => {
    let inss: Inss;

    beforeEach(() => {
      inss = Inss.newFromSalary(1000);
    });

    it('calculation basis should be equal to event salary', () => {
      expect(inss.calculationBasis).toBe(inss.event.salary);
    });

    it('earning should return false', () => {
      expect(Inss.earning).toBe(false);
    });
  });

  describe('should return correct values and references', () => {
    it('salary is 1000', () => {
      const inss = Inss.newFromSalary(1000);
      const value = inss.getValue();
      const reference = inss.getReference() as number;

      expect(value).toBeCloseTo(80.0, precision);
      expect(reference).toBeCloseTo(0.08, precision);
    });

    it('salary is 2000', () => {
      const inss = Inss.newFromSalary(2000);
      const value = inss.getValue();
      const reference = inss.getReference() as number;

      expect(value).toBeCloseTo(180.0, precision);
      expect(reference).toBeCloseTo(0.09, precision);
    });

    it('salary is 3000', () => {
      const inss = Inss.newFromSalary(3000);
      const value = inss.getValue();
      const reference = inss.getReference() as number;

      expect(value).toBeCloseTo(330.0, precision);
      expect(reference).toBeCloseTo(0.11, precision);
    });

    it('salary is 6000', () => {
      const inss = Inss.newFromSalary(6000);
      const value = inss.getValue();
      const reference = inss.getReference() as string;

      expect(value).toBeCloseTo(642.34, precision);
      expect(reference).toBe('Ceil');
    });
  });
});
