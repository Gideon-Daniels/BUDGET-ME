import mysql from 'mysql2/promise';
import fs from 'node:fs/promises';

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'budget_me_app',
  });
  const fileNames = await fs.readdir('src/database/migrations');
  for (const filename of fileNames) {
    const sql = await fs.readFile(
      `src/database/migrations/${filename}`,
      'utf8',
    );
    await connection.query(sql);
  }
  console.log("Tables created (if it didn't exist already)");
  await connection.end();
}

migrate().catch((e) => {
  console.error(e);
  process.exit(-1);
});
