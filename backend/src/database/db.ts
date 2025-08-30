import mysql from 'mysql2/promise';

export async function dbConnection(): Promise<mysql.Connection | Error> {
  return mysql
    .createConnection({
      host: 'localhost',
      user: 'root',
      password: 'a',
      database: 'budget_me_app',
    })
    .catch((e): Error => {
      console.log(e);
      return e;
    });
}
