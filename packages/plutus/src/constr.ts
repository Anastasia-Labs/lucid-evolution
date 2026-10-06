export class Constr<T> {
  index: number;
  fields: T[];

  constructor(index: number, fields: T[]) {
    this.index = index;
    this.fields = fields;
  }
}
