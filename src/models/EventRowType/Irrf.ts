import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';
import { IrrfTableRow, irrfTable, dependentDeduction } from './IrrfTableRow';
import { Inss } from './Inss';

export class Irrf implements EventRowType {
  static displayName = 'IRRF';
  static automatic = true;
  static bases: KeyOfBases[] = [];
  static earning = false;
  calculationBasis: number;

  static newFromSalary(salary: number): Irrf {
    const event = new PayrollEvent(salary);
    return new Irrf(event);
  }

  constructor(public event: PayrollEvent) {
    const baseIrrf = this.event.bases['irrf'] || this.event.salary;
    this.calculationBasis =
      baseIrrf - this.getInss() - this.getDependentsDeduction();
  }

  private getInss(): number {
    return new Inss(this.event).getValue();
  }

  private getRow(): IrrfTableRow | undefined {
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

  public getDependentsDeduction(): number {
    const eventOptions = this.event.options;
    if (eventOptions.dependents) {
      return eventOptions.dependents * dependentDeduction;
    }
    return 0;
  }
}
