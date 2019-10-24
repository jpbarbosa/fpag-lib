import { precision } from './config';
import { Salary } from '../models/EventRowType/Salary';

describe('Salary usage suite', () => {
  describe('general properties and methods', () => {
    let salary: Salary;

    beforeEach(() => {
      salary = Salary.newFromSalary(1000);
    });

    it('calculation basis should be equal to event salary', () => {
      expect(salary.calculationBasis).toBe(salary.event.salary);
    });

    it('earning should return true', () => {
      expect(Salary.earning).toBe(true);
    });
  });

  describe('should return correct values and references', () => {
    it('salary is 1000', () => {
      const salary = Salary.newFromSalary(1000);
      const value = salary.getValue();
      const reference = salary.getReference();

      expect(value).toBeCloseTo(1000, precision);
      expect(reference).toBeCloseTo(1, precision);
    });

    it('salary is 2000', () => {
      const salary = Salary.newFromSalary(2000);
      const value = salary.getValue();
      const reference = salary.getReference();

      expect(value).toBeCloseTo(2000, precision);
      expect(reference).toBeCloseTo(1, precision);
    });
  });
});
