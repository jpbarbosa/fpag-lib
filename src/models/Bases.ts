export interface Bases {
  inss?: number;
  irrf?: number;
  fgts?: number;
  inssOnThirteenthSalary?: number;
  irrfOnThirteenthSalary?: number;
}

export type KeyOfBases = keyof Bases;
