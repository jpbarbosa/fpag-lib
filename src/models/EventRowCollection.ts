import { EventRowTypeClass } from './EventRowType';
import { EventRow } from './EventRow';
import { PayrollEvent } from './PayrollEvent';
import { Bases } from './Bases';

interface EventRowDB {
  type: string;
  reference: number | string;
  value: number;
}

export class EventRowCollection {
  eventRows: EventRow[] = [];

  constructor(
    public event: PayrollEvent,
    private eventRowTypeClasses: EventRowTypeClass[] = []
  ) {}

  public addRows(automatic: boolean): void {
    this.eventRowTypeClasses
      .filter(row => row.automatic === automatic)
      .forEach(eventRowTypeClass => {
        this.addRow(eventRowTypeClass);
      });
  }

  public addRow(eventRowTypeClass: EventRowTypeClass, value?: number): void {
    const eventRowType = new eventRowTypeClass(this.event, value);
    if (eventRowType.passConditional()) {
      this.eventRows.push({
        type: eventRowTypeClass,
        reference: eventRowType.getReference(),
        value: eventRowType.getValue()
      });
    }
  }

  public findRow(eventRowTypeClass: EventRowTypeClass): EventRow | undefined {
    return this.eventRows.find(row => row.type === eventRowTypeClass);
  }

  public sumValues(earnings: boolean): number {
    return this.eventRows.reduce(
      (sum: number, eventRow: EventRow): number =>
        eventRow.type.earning === earnings ? sum + eventRow.value : sum,
      0
    );
  }

  public sumBases(): Bases {
    const bases: Bases = {};
    for (const result of this.eventRows) {
      for (const base of result.type.bases) {
        const currentValue = bases[base] || 0;
        bases[base] = currentValue + result.value;
      }
    }
    return bases;
  }

  public toArray(): EventRowDB[] {
    const eventRows: EventRowDB[] = [];
    this.eventRows.forEach(eventRow => {
      eventRows.push({
        type: eventRow.type.displayName,
        reference: eventRow.reference,
        value: eventRow.value
      });
    });
    return eventRows;
  }
}
