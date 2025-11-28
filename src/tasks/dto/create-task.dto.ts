import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty({ message: 'Status is required' })
  @IsIn(['pending', 'in-progress', 'done'], {
    message: 'Status must be one of: pending, in-progress, done',
  })
  status: 'pending' | 'in-progress' | 'done';
}
