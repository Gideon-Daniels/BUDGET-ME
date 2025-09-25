import mysql, { QueryResult } from 'mysql2/promise';
import { Report } from '../models/Reports.ts';
import { Transaction_statements } from '../models/Transaction_statements.js';

type TableName = 'transaction_statements' | 'reports';

export class DatabaseService {
  dbConnection!: mysql.Connection;

  constructor() {
    this.start().then();
  }

  async start() {
    this.dbConnection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'budget_me_app',
    });
  }

  async addEntry(tableName: TableName, data: Report | Transaction_statements) {
    if (!data) throw new Error('invalid data was received');
    const columns = Object.keys(data).toString();
    const values = Object.values(data);
    const placeholders = values.map(() => '?');
    const sql = `INSERT INTO ${tableName}(${columns}) VALUES (${placeholders})`;
    await this.dbConnection.execute(sql, values);
  }

  async fetchAllEntries(
    tableName: TableName,
  ): Promise<mysql.QueryResult | undefined> {
    const sql = `SELECT * FROM ${tableName}`;

    try {
      const [result] = await this.dbConnection.query(sql);
      return result;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async deleteMultipleEntries(
    tableName: TableName,
    ids: number[],
  ): Promise<mysql.QueryResult | undefined> {
    if (!ids) throw new Error('invalid data was received');
    const placeholders = ids.map(() => '?').join(', ');

    try {
      const sql = `DELETE FROM ${tableName} WHERE id IN (${placeholders})`;
      const [result] = await this.dbConnection.execute(sql, ids);
      return result;
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async FetchEntry(
    tableName: TableName,
    id: string,
  ): Promise<QueryResult | undefined> {
    const sql = `SELECT * FROM ${tableName} WHERE id=?`;

    try {
      const result = await this.dbConnection.execute(sql, [id]);

      if (result[0] instanceof Array && !result[0].length) return;
      return result[0];
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async deleteEntry(tableName: TableName, id: string) {
    const sql = `DELETE FROM ${tableName} WHERE id=?`;
    await this.dbConnection.execute(sql, [id]);
  }

  async updateEntry(
    tableName: TableName,
    id: string,
    data: Report | Transaction_statements,
  ) {
    if (!data) throw new Error('invalid data ');
    const query = Object.keys(data)
      .map((key: string): string => {
        // @ts-ignore
        return `${key} = '${data[key]}'`;
      })
      .toString();
    const sql = `UPDATE ${tableName} SET ${query} WHERE id=?  LIMIT 1`;
    await this.dbConnection.execute(sql, [id]);
  }

  async aggregateReports() {
    const query = `
      SELECT
        CASE
          WHEN GROUPING(YEAR(date)) = 0 AND GROUPING(MONTH(date)) = 0 THEN 'monthly'
          WHEN GROUPING(YEAR(date)) = 0 AND GROUPING(MONTH(date)) = 1 THEN 'yearly'
          WHEN GROUPING(YEAR(date)) = 1 AND GROUPING(MONTH(date)) = 1 THEN 'overall'
          END AS summaryType,
        YEAR(date) AS year,
        MONTH(date) AS month,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpense,
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) -
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalBalance
      FROM reports
      GROUP BY YEAR(date), MONTH(date) WITH ROLLUP
      ORDER BY year, month;
    `;

    try {
      const [result] = await this.dbConnection.query(query);
      return result;
    } catch (e) {
      return;
    }
  }
}
