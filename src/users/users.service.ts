import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Kysely } from 'kysely';
import { DB } from 'src/database/database.schema';
import { UUID } from 'node:crypto';

@Injectable()
export class UsersService {
  constructor(@Inject('KyselyInstance') private readonly db: Kysely<DB>) {}

  create(createUserDto: CreateUserDto) {
    return this.db.insertInto('users').values(createUserDto).execute();
  }

  findOne(id: UUID) {
    return this.db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
  }

  findOneByEmail(email: string) {
    return this.db
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();
  }
}
