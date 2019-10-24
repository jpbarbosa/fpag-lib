import { precision } from './config';
import { Irrf } from '../models/EventRowType/Irrf';

describe('Irrf usage suite', () => {
  describe('general properties and methods', () => {
    let irrf: Irrf;

    beforeEach(() => {
      irrf = Irrf.newFromSalary(1000);
    });

    it('earning should return false', () => {
      expect(Irrf.earning).toBe(false);
    });
  });

  describe('should return correct values and references', () => {
    it('salary is 2000', () => {
      const irrf = Irrf.newFromSalary(2000);
      const value = irrf.getValue();
      const reference = irrf.getReference();

      expect(value).toBeCloseTo(0.0, precision);
      expect(reference).toBeCloseTo(0.0, precision);
    });

    it('salary is 3000', () => {
      const irrf = Irrf.newFromSalary(3000);
      const value = irrf.getValue();
      const reference = irrf.getReference();

      expect(value).toBeCloseTo(57.45, precision);
      expect(reference).toBeCloseTo(0.075, precision);
    });

    it('salary is 4000', () => {
      const irrf = Irrf.newFromSalary(4000);
      const value = irrf.getValue();
      const reference = irrf.getReference();

      expect(value).toBeCloseTo(179.2, precision);
      expect(reference).toBeCloseTo(0.15, precision);
    });

    it('salary is 5000', () => {
      const irrf = Irrf.newFromSalary(5000);
      const value = irrf.getValue();
      const reference = irrf.getReference();

      expect(value).toBeCloseTo(365.12, precision);
      expect(reference).toBeCloseTo(0.225, precision);
    });

    it('salary is 6000', () => {
      const irrf = Irrf.newFromSalary(6000);
      const value = irrf.getValue();
      const reference = irrf.getReference();

      expect(value).toBeCloseTo(604.0, precision);
      expect(reference).toBeCloseTo(0.275, precision);
    });

    it('salary out of range', () => {
      const irrf = Irrf.newFromSalary(9999999);

      expect(() => irrf.getValue()).toThrowError('Salary out of range');
      expect(() => irrf.getReference()).toThrowError('Salary out of range');
    });
  });
});
