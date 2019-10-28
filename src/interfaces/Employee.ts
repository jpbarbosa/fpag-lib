export interface NewEmployee {
  name: string;
  salary: number;
  admission: Date;
}

export interface Employee extends NewEmployee {
  id: number;
}
