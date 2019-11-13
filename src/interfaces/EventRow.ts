import { Tenant } from './Tenant';

export interface EventRow {
  type: string;
  reference: number;
  value: number;
  tenant?: Tenant;
}
