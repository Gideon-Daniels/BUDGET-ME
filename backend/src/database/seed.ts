import mysql from 'mysql2/promise';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const seedsDir = path.join(__dirname, 'seeds');

async function seed() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Seeding is disabled outside development');
  }
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'budget_me_app',
    multipleStatements: true,
  });

  const fileNames = (await fs.readdir(seedsDir))
    .filter((f) => f.endsWith('.sql'))
    .sort(); // ensure order
  for (const filename of fileNames) {
    const sqlPath = path.join(seedsDir, filename);
    const sql = await fs.readFile(sqlPath, 'utf8');
    console.log(`Running seed: ${filename}`);
    await connection.query(sql);
  }
  console.log('Data Inserted successfully');
  await connection.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
