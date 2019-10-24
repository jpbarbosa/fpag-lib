export interface IrrfTableRow {
  maxSalary: number;
  rate: number;
  deduction: number;
}

export const irrfTable: IrrfTableRow[] = [
  {
    maxSalary: 1903.98,
    rate: 0,
    deduction: 0
  },
  {
    maxSalary: 2826.65,
    rate: 0.075,
    deduction: 142.8
  },
  {
    maxSalary: 3751.05,
    rate: 0.15,
    deduction: 354.8
  },
  {
    maxSalary: 4664.68,
    rate: 0.225,
    deduction: 636.13
  },
  {
    maxSalary: 999999.0,
    rate: 0.275,
    deduction: 869.36
  }
];

export const dependentDeduction = 189.59;
