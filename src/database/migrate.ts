import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import { DB } from './database.schema';
import { config } from 'dotenv';

// Load environment variables
config();

async function migrate() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = new Kysely<DB>({
    dialect: new PostgresDialect({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      pool,
    }),
  });

  try {
    console.log('Starting database migration...');

    // Read migration file
    const migrationPath = path.join(
      __dirname,
      '../../migrations/001_initial_schema.sql',
    );
    const sqlContent = fs.readFileSync(migrationPath, 'utf-8');

    // Execute the entire SQL file using the pool directly
    // This handles multi-statement SQL files better
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const client = await pool.connect();
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await client.query(sqlContent);
    } finally {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      client.release();
    }

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await db.destroy();
  }
}

migrate()
  .then(() => {
    console.log('Migration script finished.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Migration script failed:', error);
    process.exit(1);
  });
