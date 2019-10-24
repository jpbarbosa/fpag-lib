import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';
import {
  Termination,
  TerminationCause,
  TerminationNotice
} from '../PayrollEvent/Termination';

export class PreviousNoticeIndemnifiedByCompany implements EventRowType {
  static displayName = 'Previous Notice Indemnified By Company';
  static automatic = false;
  static bases: KeyOfBases[] = [];
  static earning = true;
  calculationBasis: number;

  static newFromSalary(salary: number): PreviousNoticeIndemnifiedByCompany {
    const event = new PayrollEvent(salary);
    return new PreviousNoticeIndemnifiedByCompany(event);
  }

  constructor(public event: PayrollEvent) {
    this.calculationBasis = this.event.salary;
  }

  public passConditional(): boolean {
    const { terminationCause, terminationNotice } = this.event.options;
    return (
      typeof terminationCause !== 'undefined' &&
      terminationCause === TerminationCause.byEmployerWithoutFairReason &&
      typeof terminationNotice !== 'undefined' &&
      terminationNotice === TerminationNotice.indemnified
    );
  }

  public getReference(): number {
    return 1;
  }

  public getValue(): number {
    const termination = this.event as Termination;
    return (this.calculationBasis / 30) * termination.getMinNoticeDays();
  }
}
