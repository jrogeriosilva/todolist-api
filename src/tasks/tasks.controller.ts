import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CompleteTaskDto } from './dto/complete-task.dto';


@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Create task (POST /tasks)
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  // List all tasks (GET /tasks)
  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  // Search task by ID (GET /tasks/:id)
  @Get(':id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Task {
    return this.taskService.getTaskById(id);
  }

  // Update task (PATCH /tasks/:id)
  @Patch(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  // Delete task (DELETE /tasks/:id)
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Task {
    return this.taskService.deleteTask(id);
  }

  @Patch(':id/complete')
  completeTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() completeTaskDto: CompleteTaskDto,
  ): Task {
    return this.taskService.completeTask(id, completeTaskDto.completed);
  }
}
