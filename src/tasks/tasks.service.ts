import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];
  private currentId = 1;

  // Create Task
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const newTask: Task = {
      id: this.currentId++,
      title,
      description,
    };
    this.tasks.push(newTask);
    return newTask;
  }

  // List all tasks
  getAllTasks(): Task[] {
    return this.tasks;
  }

  // Search task by ID
  getTaskById(id: number): Task {
    const foundTask = this.tasks.find((task) => task.id === id);
    if (!foundTask) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return foundTask;
  }

  // Update task
  updateTask(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.getTaskById(id);
    const { title, description } = updateTaskDto;

    if (title !== undefined) {
      task.title = title;
    }
    if (description !== undefined) {
      task.description = description;
    }

    return task;
  }

  // Delete task
  deleteTask(id: number): Task {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return task;
  }
}
