import mysql from 'mysql2/promise';
import fs from 'node:fs/promises';

async function migrate() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'budget_me_app',
  });
  const fileNames = await fs.readdir('migrations');
  for (const filename of fileNames) {
    const sql = await fs.readFile(`migrations/${filename}`, 'utf8');
    await connection.query(sql);
  }
  console.log("Tables created (if it didn't exist already)");
  await connection.end();
}

migrate().catch((e) => {
  console.error(e);
  process.exit(-1);
});
