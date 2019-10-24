import { EventRowType } from '.';
import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';
import { InssTableRow, inssTable } from './InssTableRow';

export class InssOnThirteenthSalary implements EventRowType {
  static displayName = 'INSS On Thirteenth Salary';
  static automatic = true;
  static bases: KeyOfBases[] = [];
  static earning = false;
  calculationBasis: number;

  static newFromSalary(salary: number): InssOnThirteenthSalary {
    const event = new PayrollEvent(salary);
    return new InssOnThirteenthSalary(event);
  }

  constructor(public event: PayrollEvent) {
    const baseInss =
      this.event.bases['inssOnThirteenthSalary'] || this.event.salary;
    this.calculationBasis = baseInss;
  }

  getRow(): InssTableRow | undefined {
    return inssTable.find(row => row.maxSalary >= this.calculationBasis);
  }

  getCeil(): number {
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
