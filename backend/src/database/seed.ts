import fs from 'node:fs/promises';
import mysql from 'mysql2/promise';

async function seed() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'budget_me_app',
    multipleStatements: true,
  });
  const fileNames = await fs.readdir('seeds');
  for (const filename of fileNames) {
    const sql = await fs.readFile(`seeds/${filename}`, 'utf8');
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
