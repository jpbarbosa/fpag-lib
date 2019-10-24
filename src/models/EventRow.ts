import { EventRowTypeClass } from './EventRowType';

export interface EventRow {
  type: EventRowTypeClass;
  reference: number | string;
  value: number;
}
