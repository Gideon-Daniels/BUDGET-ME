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

  async fetchRowFromTable(
    tableName: TableName,
    id: string,
  ): Promise<QueryResult | undefined> {
    const sql = `SELECT * FROM ${tableName} WHERE id=${id} `;

    try {
      const result = await this.dbConnection.query(sql);

      if (result[0] instanceof Array && !result[0].length) return;
      return result[0];
    } catch (e) {
      console.log(e);
      return;
    }
  }
  async deleteRowFromTable(tableName: TableName, id: string) {
    const sql = `DELETE FROM ${tableName} WHERE id=${id} `;
    const res = await this.dbConnection.query(sql);
    console.log(res);
  }
  // async updateReport(data: Report) {
  //   const sql =
  //     'INSERT INTO `reports`(`amount`,`type`,`category`,`date`,`description`) VALUES (?,?,?,?,?)';
  //
  //   await this.dbConnection.execute(sql, [
  //     data.amount,
  //     data.type,
  //     data.category,
  //     data.date,
  //     data.description,
  //   ]);
  // }
}
