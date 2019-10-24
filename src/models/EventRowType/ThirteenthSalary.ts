import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';

export class ThirteenthSalary implements EventRowType {
  static displayName = 'Thirteenth Salary';
  static automatic = false;
  static bases: KeyOfBases[] = [
    'inssOnThirteenthSalary',
    'irrfOnThirteenthSalary',
    'fgts'
  ];
  static earning = true;
  calculationBasis: number;

  static newFromSalary(salary: number): ThirteenthSalary {
    const event = new PayrollEvent(salary);
    return new ThirteenthSalary(event);
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
