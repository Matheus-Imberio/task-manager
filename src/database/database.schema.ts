import { UUID } from 'crypto';

export interface User {
  id: UUID;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface Task {
  id: UUID;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'done';
  tip?: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

export interface DB {
  users: User;
  tasks: Task;
}
