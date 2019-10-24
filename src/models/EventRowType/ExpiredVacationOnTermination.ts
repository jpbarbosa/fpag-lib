import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';

export class ExpiredVacationOnTermination implements EventRowType {
  static displayName = 'Expired Vacation On Termination';
  static automatic = false;
  static bases: KeyOfBases[] = [];
  static earning = true;
  calculationBasis: number;

  static newFromSalary(salary: number): ExpiredVacationOnTermination {
    const event = new PayrollEvent(salary);
    return new ExpiredVacationOnTermination(event);
  }

  constructor(public event: PayrollEvent) {
    this.calculationBasis = this.event.salary;
  }

  public passConditional(): boolean {
    return (
      typeof this.event.options.expiredVacation !== 'undefined' &&
      this.event.options.expiredVacation === true
    );
  }

  public getReference(): number {
    return 1;
  }

  public getValue(): number {
    return this.calculationBasis;
  }
}
