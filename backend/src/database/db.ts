import mysql from 'mysql2/promise';
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

  async addDataToTable(
    tableName: TableName,
    data: Report | Transaction_statements,
  ) {
    // if (this.dbConnection instanceof Error) throw this.dbConnection;
    const columns = Object.keys(data).toString();
    const values = Object.values(data);
    const statements = values.map(() => '?');
    const sql = `INSERT INTO ${tableName}(${columns}) VALUES (${statements})`;
    await this.dbConnection.execute(sql, values);
  }

  async fetchDataFromTable(
    tableName: TableName,
  ): Promise<mysql.QueryResult | undefined> {
    const sql = `SELECT * FROM ${tableName}`;

    try {
      const result = await this.dbConnection.query(sql);
      return result[0];
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async getReport(data: Report) {
    const sql =
      'INSERT INTO `reports`(`amount`,`type`,`category`,`date`,`description`) VALUES (?,?,?,?,?)';

    await this.dbConnection.execute(sql, [
      data.amount,
      data.type,
      data.category,
      data.date,
      data.description,
    ]);
  }

  async updateReport(data: Report) {
    const sql =
      'INSERT INTO `reports`(`amount`,`type`,`category`,`date`,`description`) VALUES (?,?,?,?,?)';

    await this.dbConnection.execute(sql, [
      data.amount,
      data.type,
      data.category,
      data.date,
      data.description,
    ]);
  }

  async deleteReport(data: Report) {
    const sql =
      'INSERT INTO `reports`(`amount`,`type`,`category`,`date`,`description`) VALUES (?,?,?,?,?)';

    await this.dbConnection.execute(sql, [
      data.amount,
      data.type,
      data.category,
      data.date,
      data.description,
    ]);
  }
}
