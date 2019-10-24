import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';

export class Salary implements EventRowType {
  static displayName = 'Salary';
  static automatic = false;
  static bases: KeyOfBases[] = ['irrf', 'fgts'];
  static earning = true;
  calculationBasis: number;

  static newFromSalary(salary: number): Salary {
    const event = new PayrollEvent(salary);
    return new Salary(event);
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
    return this.calculationBasis;
  }
}
