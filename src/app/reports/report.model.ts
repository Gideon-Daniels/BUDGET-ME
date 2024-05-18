export class Report {
  title: string;
  category: string;
  type: string;
  date: string;
  amount: string;

  constructor(
    title: string,
    category: string,
    typeOfReport: string,
    date: string,
    amount: string,
  ) {
    this.title = title;
    this.category = category;
    this.type = typeOfReport;
    this.date = date;
    this.amount = amount;
  }
}
