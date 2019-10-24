import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';
import { InssTableRow, inssTable } from './InssTableRow';

export class Inss implements EventRowType {
  static displayName = 'INSS';
  static automatic = true;
  static bases: KeyOfBases[] = [];
  static earning = false;
  calculationBasis: number;

  static newFromSalary(salary: number): Inss {
    const event = new PayrollEvent(salary);
    return new Inss(event);
  }

  constructor(public event: PayrollEvent) {
    const baseInss = this.event.bases['inss'] || this.event.salary;
    this.calculationBasis = baseInss;
  }

  private getRow(): InssTableRow | undefined {
    return inssTable.find(row => row.maxSalary >= this.calculationBasis);
  }

  private getCeil(): number {
    const lastRow = inssTable[inssTable.length - 1];
    return lastRow.maxSalary * lastRow.rate;
  }

  public passConditional(): boolean {
    return true;
  }

  public getReference(): number | string {
    const inssTableRow = this.getRow();
    if (inssTableRow) {
      return inssTableRow.rate;
    }
    return 'Ceil';
  }

  public getValue(): number {
    const inssTableRow = this.getRow();
    if (inssTableRow) {
      return this.calculationBasis * inssTableRow.rate;
    }
    return this.getCeil();
  }
}
