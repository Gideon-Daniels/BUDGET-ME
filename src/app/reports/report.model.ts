export interface IReport {
  title: string;
  amount: string;
  type: string;
  category: string;
  date: Date;
  description: string;
}

export class Report implements IReport {
  public title: string;
  public amount: string;
  public type: string;
  public category: string;
  public date: Date;
  public description: string;

  constructor(
    title: string,
    amount: string,
    type: string,
    category: string,
    date: Date,
    description: string,
  ) {
    this.title = title;
    this.amount = amount;
    this.type = type;
    this.category = category;
    this.date = date;
    this.description = description;
  }
}
