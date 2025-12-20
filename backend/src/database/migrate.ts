import mysql from 'mysql2/promise';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './db.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, 'migrations');
console.log(`Migrations directory: ${migrationsDir}`);
async function migrate() {
  const connection = await mysql.createConnection(config);
  const fileNames = (await fs.readdir(migrationsDir))
    .filter((f) => f.endsWith('.sql'))
    .sort(); // ensure order

  for (const filename of fileNames) {
    const sqlPath = path.join(migrationsDir, filename);
    const sql = await fs.readFile(sqlPath, 'utf8');
    console.log(`Running migration: ${filename}`);
    await connection.query(sql);
  }

  console.log("Tables created (if they didn't exist already)");
  await connection.end();
}

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
