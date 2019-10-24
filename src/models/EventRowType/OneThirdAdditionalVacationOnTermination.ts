import { EventRowType } from '../EventRowType';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';
import { ProportionalVacationNoticeWorked } from './ProportionalVacationNoticeWorked';

export class OneThirdAdditionalVacationOnTermination implements EventRowType {
  static displayName = 'One Third Additional Vacation On Termination';
  static automatic = false;
  static bases: KeyOfBases[] = [];
  static earning = true;
  calculationBasis: number;

  static newFromSalary(
    salary: number
  ): OneThirdAdditionalVacationOnTermination {
    const event = new PayrollEvent(salary);
    return new OneThirdAdditionalVacationOnTermination(event);
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
    const proportionalVacationNoticeWorked = new ProportionalVacationNoticeWorked(
      this.event
    );
    return proportionalVacationNoticeWorked.getValue() / 3;
  }
}
