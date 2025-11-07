import { ConfigService } from '@nestjs/config';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
import { DB } from 'src/database/database.schema';

export const kyselyProvider = {
  provide: 'KyselyInstance',
  useFactory: (configService: ConfigService) => {
    const dialect = new PostgresDialect({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      pool: new Pool({
        connectionString: configService.get<string>('DATABASE_URL'),
      }),
    });

    const db = new Kysely<DB>({
      dialect,
    });
    return db;
  },
  inject: [ConfigService],
};
