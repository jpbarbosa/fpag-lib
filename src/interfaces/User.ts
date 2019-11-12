import { Tenant } from './Tenant';

export interface NewUser {
  name: string;
  email: string;
  password: string;
  tenant: Tenant;
}

export interface User extends NewUser {
  id: number;
}
