import { Tenant } from './Tenant';

export interface NewEmployee {
  name: string;
  salary: number;
  admission: Date;
  tenant: Tenant;
}

export interface Employee extends NewEmployee {
  id: number;
}
