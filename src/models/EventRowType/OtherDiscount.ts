import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';

export class OtherDiscount implements EventRowType {
  static displayName = 'Other Discount';
  static automatic = false;
  static bases: KeyOfBases[] = [];
  static earning = false;
  calculationBasis: number;

  static newFromSalary(salary: number, discountValue: number): OtherDiscount {
    const event = new PayrollEvent(salary);
    return new OtherDiscount(event, discountValue);
  }

  constructor(public event: PayrollEvent, public value?: number) {
    this.calculationBasis = this.event.salary;
  }

  public passConditional(): boolean {
    return true;
  }

  public getReference(): number {
    return 1;
  }

  public getValue(): number {
    const value = this.value;
    if (value) {
      return value;
    }
    return 0;
  }
}
