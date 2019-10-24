import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';

export class ThirteenthSalaryAdvanceDeduction implements EventRowType {
  static displayName = 'Thirteenth Salary Advance Deduction';
  static automatic = false;
  static bases: KeyOfBases[] = [];
  static earning = false;
  calculationBasis: number;

  static newFromSalary(salary: number): ThirteenthSalaryAdvanceDeduction {
    const event = new PayrollEvent(salary);
    return new ThirteenthSalaryAdvanceDeduction(event);
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
