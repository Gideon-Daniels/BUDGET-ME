import fs from 'node:fs/promises';
import mysql from 'mysql2/promise';

async function seed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'budget_me_app',
    multipleStatements: true,
  });
  const fileNames = await fs.readdir('src/database/seeds');
  for (const filename of fileNames) {
    const sql = await fs.readFile(`src/database/seeds/${filename}`, 'utf8');
    console.log(sql);
    await connection.query(sql);
  }
  console.log('Data Inserted successfully');
  await connection.end();
}

seed().catch((e) => {
  console.error(e);
  process.exit(-1);
});
