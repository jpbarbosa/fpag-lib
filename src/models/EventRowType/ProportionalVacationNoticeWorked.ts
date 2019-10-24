import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';

export class ProportionalVacationNoticeWorked implements EventRowType {
  static displayName = 'Proportional Vacation Notice Worked';
  static automatic = false;
  static bases: KeyOfBases[] = [];
  static earning = true;
  calculationBasis: number;

  static newFromSalary(salary: number): ProportionalVacationNoticeWorked {
    const event = new PayrollEvent(salary);
    return new ProportionalVacationNoticeWorked(event);
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
    const admissionDate = this.event.options.admissionDate;
    if (!eventDate || !admissionDate) {
      throw new Error('eventDate and admissionDate must be set');
    }
    let months = Math.round(eventDate.diff(admissionDate, 'months', true));
    if (months > 12) {
      months = months - 12;
    }
    return (this.calculationBasis / 12) * months;
  }
}
