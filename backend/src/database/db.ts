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
    // if (this.dbConnection instanceof Error) throw this.dbConnection;
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
      const result = await this.dbConnection.query(sql);
      return result[0];
    } catch (e) {
      console.log(e);
      return;
    }
  }

  async deleteMultipleEntries(
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
    const res = await this.dbConnection.execute(sql, [id]);
    console.log(res);
  }

  async updateEntry(
    tableName: TableName,
    id: string,
    data: Report | Transaction_statements,
  ) {
    const query = Object.keys(data)
      .map((key: string): string => {
        // @ts-ignore
        return `${key} = '${data[key]}'`;
      })
      .toString();
    console.log(query);
    const sql = `UPDATE ${tableName} SET ${query} WHERE id=?  LIMIT 1`;
    const res = await this.dbConnection.execute(sql, [id]);
    console.log(res);
  }
}
