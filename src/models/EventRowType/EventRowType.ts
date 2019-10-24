import { KeyOfBases } from '../Bases';
import { PayrollEvent } from '../PayrollEvent';

export interface EventRowTypeClass {
  new (event: PayrollEvent, value?: number): EventRowType;
  displayName: string;
  automatic: boolean;
  bases: KeyOfBases[];
  earning: boolean;
}

export interface EventRowType {
  event: PayrollEvent;
  value?: number;
  calculationBasis: number;
  passConditional(): boolean;
  getReference(): number | string;
  getValue(): number;
}
