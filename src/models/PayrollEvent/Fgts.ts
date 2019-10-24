export class Fgts {
  static fgtsRate = 0.08;

  static getValue(baseFgts: number) {
    return baseFgts * this.fgtsRate;
  }
}
