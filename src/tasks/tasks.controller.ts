import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import * as crypto from 'crypto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: Request & { user: { sub: crypto.UUID } },
  ) {
    return this.tasksService.create({
      ...createTaskDto,
      user_id: req.user.sub,
    });
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() req: Request & { user: { sub: crypto.UUID } }) {
    return this.tasksService.findAll(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: crypto.UUID,
    @Req() req: Request & { user: { sub: crypto.UUID } },
  ) {
    return this.tasksService.findOne(req.user.sub, id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: crypto.UUID,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: Request & { user: { sub: crypto.UUID } },
  ) {
    return this.tasksService.update(req.user.sub, id, updateTaskDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: crypto.UUID,
    @Req() req: Request & { user: { sub: crypto.UUID } },
  ) {
    return this.tasksService.remove(req.user.sub, id);
  }
}
