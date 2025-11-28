import { UUID } from 'node:crypto';

export class CreateUserDto {
  id: UUID;
  name: string;
  email: string;
  password: string;
}
