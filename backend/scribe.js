import scribe from "scribe.js-ocr";
import _ from "lodash";

const dateRegex =
  /\b(0[1-9]|[12][0-9]|3[01])\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b(?!\s+\d{4}\b)/;

const balanceRegex = /^(\d+\s\d{3}|\d+)\.\d{2}$/;

export class Scribe {
  columnHeadings = [];
  rows = [];
  data = [];
  pdfFilePaths;

  constructor(pdfFilePaths) {
    this.pdfFilePaths = pdfFilePaths;
    this.init();
  }

  async init() {
    // Use Scribe.js to perform OCR on the PDF buffer
    await scribe.init({ pdf: true, ocr: true });
    await scribe.importFiles([this.pdfFilePaths]);
    await this.start();
  }

  async start() {
    const pages = await scribe.recognize();
    await this.extractTextAndTablesFromPdf(pages);
  }

  async stop() {
    await scribe.terminate();
  }

  async extractTextAndTablesFromPdf(scribePages) {
    this.data = _.flatMap(scribePages, (page, index) => {
      return _.flatMap(page.pars, (pars) => {
        return _.flatMap(pars.lines, (line) =>
          _.map(line.words, "text").join(" "),
        );
      });
    });
    this.createColumnHeadings(this.data);
    this.createRows(this.data);
  }

  createColumnHeadings(data) {
    // get the first valid index for headings;
    // get the last valid index for headings;
    // get all the indexes from the data set that is in between the first and last valid indexes;
    // remove and store indexes from the data set into columnHeading data set
    const firstHeading = _.findIndex(data, (val) => val === "Date");
    const lastHeading = _.findIndex(data, (value) => value === "Balance (R)");
    const headingIndexes = Array.from(
      { length: lastHeading - firstHeading + 1 },
      (_, i) => firstHeading + i,
    );
    this.columnHeadings = _.pullAt(data, headingIndexes);
    _.pull(data, ...this.columnHeadings);
  }

  createRows(data) {
    // get the first valid index for rows;
    // get the last valid index for rows;
    // get all the indexes from the data set that is in between the first and last valid indexes;
    // remove and store indexes from the data set into rows data set

    const firstColumnIndex = _.findIndex(data, (val) => dateRegex.test(val));
    const lastColumnIndex = _.findIndex(data, (val) => balanceRegex.test(val));
    if (firstColumnIndex === -1 || lastColumnIndex === -1) return;

    const columnIndexes = Array.from(
      { length: lastColumnIndex - firstColumnIndex + 1 },
      (_, i) => firstColumnIndex + i,
    );

    const rowData = _.pullAt(data, columnIndexes);
    const row = this.constructRow(rowData);

    this.rows.push(row);
    this.createRows(data);
  }

  constructRow(data) {
    const combined = data.join(" ").trim();
    const result = {
      date: null,
      description: null,
      income: null,
      expense: null,
      bankCost: null,
      balance: null,
    };
    // Extract date: e.g. "02 May"
    const dateMatch = combined.match(/\b\d{2} \w{3}\b/);
    if (dateMatch) {
      result.date = dateMatch[0];
    }

    // Extract balance (last number in format: 12 345.67)
    const balanceMatch = combined.match(/\d+\s\d{3}\.\d{2}$/);
    if (balanceMatch) {
      result.balance = balanceMatch[0];
    }

    // Extract income or expense (starts with + or -)
    const amountMatch = combined.match(
      /([+-])\s*(\d{1,3}(?: \d{3})*(?:\.\d{2}))/,
    );
    if (amountMatch) {
      const sign = amountMatch[1];
      const amount = amountMatch[2];
      if (sign === "+") {
        result.income = amount;
      } else {
        result.expense = amount;
      }
    }

    // Extract description (between date and amount)
    if (dateMatch && amountMatch) {
      const descStart = combined.indexOf(dateMatch[0]) + dateMatch[0].length;
      const descEnd = combined.indexOf(amountMatch[0]);
      result.description = combined
        .slice(descStart, descEnd)
        .replace(/[-\s]+$/, "")
        .trim();
    }
    return result;
  }
}

const instance = new Scribe("./demoFiles/demo.pdf");
