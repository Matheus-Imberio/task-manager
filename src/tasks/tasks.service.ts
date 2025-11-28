import {
  Inject,
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { DB } from 'src/database/database.schema';
import { Kysely } from 'kysely';
import axios from 'axios';
import { UUID, randomUUID } from 'crypto';

@Injectable()
export class TasksService {
  constructor(@Inject('KyselyInstance') private readonly db: Kysely<DB>) {}

  async create(createTaskDto: CreateTaskDto & { user_id: UUID }) {
    // Validar campos obrigatórios
    if (!createTaskDto.title || !createTaskDto.status) {
      throw new BadRequestException('Title and status are required');
    }

    const tips = await axios.get('https://api.adviceslip.com/advice');
    const now = new Date();
    return this.db
      .insertInto('tasks')
      .values({
        id: randomUUID(),
        title: createTaskDto.title,
        description: createTaskDto.description,
        status: createTaskDto.status,
        user_id: createTaskDto.user_id,
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

  async findOne(userId: UUID, id: UUID) {
    const task = await this.db
      .selectFrom('tasks')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.user_id !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return task;
  }

  async update(userId: UUID, id: UUID, updateTaskDto: UpdateTaskDto) {
    // Verificar se a task existe e pertence ao usuário
    await this.findOne(userId, id);

    // Atualizar a task
    const updated = await this.db
      .updateTable('tasks')
      .set({
        ...updateTaskDto,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .where('user_id', '=', userId)
      .returningAll()
      .executeTakeFirst();

    return updated;
  }

  async remove(userId: UUID, id: UUID) {
    // Verificar se a task existe e pertence ao usuário
    await this.findOne(userId, id);

    // Deletar a task
    await this.db
      .deleteFrom('tasks')
      .where('user_id', '=', userId)
      .where('id', '=', id)
      .execute();

    return { message: 'Task deleted successfully' };
  }
}
