import mysql from 'mysql2/promise';
import { Report } from '../models/Reports.ts';

export class DatabaseService {
  dbConnection!: mysql.Connection | Error;

  constructor() {
    this.start().then();
  }

  async start() {
    this.dbConnection = await mysql
      .createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'budget_me_app',
      })
      .catch((e): Error => {
        console.log(e);
        return e;
      });
  }

  async createReport(data: Report) {
    if (this.dbConnection instanceof Error) return;

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
