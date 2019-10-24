import { PayrollEventOptions } from './PayrollEventOptions';
import { Fgts } from './Fgts';
import { Bases } from '../Bases';
import { EventRowTypeClass } from '../EventRowType';
import { EventRowCollection } from '../EventRowCollection';

export class PayrollEvent {
  public eventRowCollection: EventRowCollection;
  private _earnings: number = 0;
  private _bases: Bases = {};
  private _deductions: number = 0;
  private _netValue: number = 0;
  private _fgts: number = 0;

  constructor(
    public salary: number,
    rows: EventRowTypeClass[] = [],
    public options: PayrollEventOptions = {}
  ) {
    this.eventRowCollection = new EventRowCollection(this, rows);
  }

  public run(): void {
    this.addNonAutomaticRows();
    this._bases = this.eventRowCollection.sumBases();
    this.addAutomaticRows();
    this._earnings = this.eventRowCollection.sumValues(true);
    this._deductions = this.eventRowCollection.sumValues(false);
    this._netValue = this.earnings - this.deductions;
    this._fgts = Fgts.getValue(this.bases['fgts'] || 0);
  }

  private addNonAutomaticRows(): void {
    this.eventRowCollection.addRows(false);
  }

  private addAutomaticRows(): void {
    this.eventRowCollection.addRows(true);
  }

  public get bases(): Bases {
    return this._bases;
  }

  public get earnings(): number {
    return this._earnings;
  }

  public get deductions(): number {
    return this._deductions;
  }

  public get netValue(): number {
    return this._netValue;
  }

  public get fgts(): number {
    return this._fgts;
  }

  public row(eventRowTypeClass: EventRowTypeClass): number | undefined {
    const rowFound = this.eventRowCollection.findRow(eventRowTypeClass);
    return rowFound && rowFound.value;
  }

  public printToConsole(): void {
    const {
      eventRowCollection,
      salary,
      options,
      earnings,
      deductions,
      netValue,
      fgts
    } = this;

    console.table(this.bases);

    console.table(eventRowCollection.eventRows);

    console.table({
      salary,
      dependents: options && options.dependents,
      earnings,
      deductions,
      netValue,
      fgts
    });
  }

  public toJson(): {} {
    const {
      salary,
      options,
      earnings,
      deductions,
      netValue,
      fgts,
      eventRowCollection
    } = this;

    return {
      date: options.date && options.date.format(),
      employee: options.employeeId,
      salary,
      dependents: options.dependents,
      options,
      earnings,
      deductions,
      netValue,
      fgts,
      eventRows: eventRowCollection.toArray()
    };
  }
}
