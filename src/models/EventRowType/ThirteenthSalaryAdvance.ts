import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';

export class ThirteenthSalaryAdvance implements EventRowType {
  static displayName = 'Thirteenth Salary Advance';
  static automatic = false;
  static bases: KeyOfBases[] = [];
  static earning = true;
  calculationBasis: number;

  static newFromSalary(salary: number): ThirteenthSalaryAdvance {
    const event = new PayrollEvent(salary);
    return new ThirteenthSalaryAdvance(event);
  }

  constructor(public event: PayrollEvent) {
    this.calculationBasis = this.event.salary;
  }

  public passConditional(): boolean {
    return true;
  }

  public getReference(): number {
    return 1;
  }

  public getValue(): number {
    return this.calculationBasis / 2;
  }
}
