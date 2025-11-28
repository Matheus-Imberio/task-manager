import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DB } from 'src/database/database.schema';
import { Kysely } from 'kysely';
import axios from 'axios';
import { UUID } from 'crypto';

@Injectable()
export class TasksService {
  constructor(@Inject('KyselyInstance') private readonly db: Kysely<DB>) {}

  async create(createTaskDto: CreateTaskDto) {
    const tips = await axios.get('https://api.adviceslip.com/advice');
    const now = new Date();
    return this.db
      .insertInto('tasks')
      .values({
        ...createTaskDto,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        tip: tips.data.slip.advice,
        created_at: now,
        updated_at: now,
      })
      .returningAll()
      .executeTakeFirst();
  }

  findAll(userId: UUID) {
    return this.db
      .selectFrom('tasks')
      .selectAll()
      .where('user_id', '=', userId)
      .execute();
  }

  findOne(userId: UUID, id: UUID) {
    return this.db
      .selectFrom('tasks')
      .selectAll()
      .where('user_id', '=', userId)
      .where('id', '=', id)
      .execute();
  }

  update(userId: UUID, id: UUID, updateTaskDto: UpdateTaskDto) {
    return this.db
      .updateTable('tasks')
      .set(updateTaskDto)
      .where('user_id', '=', userId)
      .where('id', '=', id)
      .execute();
  }

  remove(userId: UUID, id: UUID) {
    return this.db
      .deleteFrom('tasks')
      .where('user_id', '=', userId)
      .where('id', '=', id)
      .execute();
  }
}
