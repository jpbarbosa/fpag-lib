import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';
import { IrrfTableRow, irrfTable, dependentDeduction } from './IrrfTableRow';
import { InssOnThirteenthSalary } from './InssOnThirteenthSalary';

export class IrrfOnThirteenthSalary implements EventRowType {
  static displayName = 'IRRF On Thirteenth Salary';
  static automatic = true;
  static bases: KeyOfBases[] = [];
  static earning = false;
  calculationBasis: number;

  static newFromSalary(salary: number): IrrfOnThirteenthSalary {
    const event = new PayrollEvent(salary);
    return new IrrfOnThirteenthSalary(event);
  }

  constructor(public event: PayrollEvent) {
    const baseIrrf =
      this.event.bases['irrfOnThirteenthSalary'] || this.event.salary;
    this.calculationBasis =
      baseIrrf - this.getInss() - this.getDependentsDeduction();
  }

  getInss(): number {
    return new InssOnThirteenthSalary(this.event).getValue();
  }

  getRow(): IrrfTableRow | undefined {
    return irrfTable.find(row => row.maxSalary >= this.calculationBasis);
  }

  public passConditional(): boolean {
    return true;
  }

  public getReference(): number {
    const irrfTableRow = this.getRow();
    if (irrfTableRow) {
      return irrfTableRow.rate;
    }
    throw new Error('Salary out of range');
  }

  public getValue(): number {
    const irrfTableRow = this.getRow();
    if (irrfTableRow) {
      return this.calculationBasis * irrfTableRow.rate - irrfTableRow.deduction;
    }
    throw new Error('Salary out of range');
  }

  getDependentsDeduction(): number {
    const event = this.event;
    if (event.options && event.options.dependents) {
      return event.options.dependents * dependentDeduction;
    }
    return 0;
  }
}
