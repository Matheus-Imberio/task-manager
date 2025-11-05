import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from 'src/database/database.schema';

export const KyselyProvider = {
  provide: 'KYSELY',
  useFactory: () => {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    return new Kysely<DB>({
      dialect: new PostgresDialect({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        pool: new Pool({ connectionString }),
      }),
    });
  },
};
