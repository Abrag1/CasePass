// One-off / repeatable SQL runner for applying supabase/migrations and supabase/seed.sql
// directly against the hosted Postgres instance, without needing Docker or `supabase login`
// (which requires an interactive browser flow this environment doesn't have).
//
// Usage: node scripts/run-sql.mjs <file1.sql> [file2.sql ...]
// Requires DATABASE_URL in .env.local (postgresql://postgres:<password>@<host>:5432/postgres).

import { readFileSync } from "node:fs";
import { Client } from "pg";
import { config } from "dotenv";

config({ path: ".env.local" });

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("Usage: node scripts/run-sql.mjs <file1.sql> [file2.sql ...]");
  process.exit(1);
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Missing DATABASE_URL in .env.local");
  process.exit(1);
}

const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });

try {
  await client.connect();
  for (const file of files) {
    console.log(`Running ${file} ...`);
    const sql = readFileSync(file, "utf8");
    await client.query(sql);
    console.log(`  ✓ done`);
  }
} catch (err) {
  console.error("SQL run failed:", err.message);
  process.exitCode = 1;
} finally {
  await client.end();
}
