import { UUID } from 'crypto';

export class CreateTaskDto {
  id: UUID;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'done';
  user_id: UUID;
}
