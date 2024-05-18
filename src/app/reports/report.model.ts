export class Report {
  title: string;
  amount: string;
  typeOfReport: string;
  category: string;
  dateOfReport: Date;

  constructor(
    title: string,
    amount: string,
    typeOfReport: string,
    category: string,
    date: Date,
  ) {
    this.title = title;
    this.amount = amount;
    this.typeOfReport = typeOfReport;
    this.category = category;
    this.dateOfReport = date;
  }
}
