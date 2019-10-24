import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';

export class ThirteenthSalaryNoticeWorked implements EventRowType {
  static displayName = 'Thirteenth Salary Notice Worked';
  static automatic = false;
  static bases: KeyOfBases[] = [
    'inssOnThirteenthSalary',
    'irrfOnThirteenthSalary',
    'fgts'
  ];
  static earning = true;
  calculationBasis: number;

  static newFromSalary(salary: number): ThirteenthSalaryNoticeWorked {
    const event = new PayrollEvent(salary);
    return new ThirteenthSalaryNoticeWorked(event);
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
    const eventDate = this.event.options.date;
    if (!eventDate) {
      throw new Error('eventDate must be set');
    }
    let months = Math.round(
      eventDate.diff(eventDate.clone().startOf('year'), 'months', true)
    );
    return (this.calculationBasis / 12) * months;
  }
}
