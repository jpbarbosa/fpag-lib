import { precision } from './config';
import { OtherDiscount } from '../models/EventRowType/OtherDiscount';

describe('OtherDiscount usage suite', () => {
  const anySalary = Math.random() * (10000 - 1000 + 1) + 1000;

  describe('general properties and methods', () => {
    let salary: OtherDiscount;

    beforeEach(() => {
      salary = OtherDiscount.newFromSalary(anySalary, 100);
    });

    it('calculation basis should be equal to event salary', () => {
      expect(salary.calculationBasis).toBe(salary.event.salary);
    });

    it('earning should return false', () => {
      expect(OtherDiscount.earning).toBe(false);
    });
  });

  describe('should return correct values and references', () => {
    it('salary is any and discount is 100', () => {
      const otherDiscount = OtherDiscount.newFromSalary(anySalary, 100);
      const value = otherDiscount.getValue();
      const reference = otherDiscount.getReference();

      expect(value).toBeCloseTo(100, precision);
      expect(reference).toBeCloseTo(1, precision);
    });

    it('salary is any and discount is 200', () => {
      const otherDiscount = OtherDiscount.newFromSalary(anySalary, 200);
      const value = otherDiscount.getValue();
      const reference = otherDiscount.getReference();

      expect(value).toBeCloseTo(200, precision);
      expect(reference).toBeCloseTo(1, precision);
    });
  });
});
