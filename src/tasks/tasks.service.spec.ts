import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './tasks.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', () => {
      const createTaskDto: CreateTaskDto = {
        title: 'Test Task',
        description: 'Test Description',
      };

      const task = service.createTask(createTaskDto);

      expect(task).toEqual({
        id: 1,
        title: 'Test Task',
        description: 'Test Description',
        completed: false,
      });
    });

    it('should auto-increment task ids', () => {
      const createTaskDto1: CreateTaskDto = {
        title: 'Task 1',
        description: 'Description 1',
      };
      const createTaskDto2: CreateTaskDto = {
        title: 'Task 2',
        description: 'Description 2',
      };

      const task1 = service.createTask(createTaskDto1);
      const task2 = service.createTask(createTaskDto2);

      expect(task1.id).toBe(1);
      expect(task2.id).toBe(2);
    });
  });

  describe('getAllTasks', () => {
    it('should return an empty array when no tasks exist', () => {
      const tasks = service.getAllTasks();
      expect(tasks).toEqual([]);
    });

    it('should return all tasks', () => {
      const createTaskDto1 = { title: 'Task 1', description: 'Description 1' };
      const createTaskDto2 = { title: 'Task 2', description: 'Description 2' };

      service.createTask(createTaskDto1);
      service.createTask(createTaskDto2);

      const tasks = service.getAllTasks();
      expect(tasks).toHaveLength(2);
      expect(tasks[0].title).toBe('Task 1');
      expect(tasks[1].title).toBe('Task 2');
    });
  });

  describe('getTaskById', () => {
    it('should return a task by id', () => {
      const createTaskDto = { title: 'Task', description: 'Description' };
      const createdTask = service.createTask(createTaskDto);

      const task = service.getTaskById(createdTask.id);
      expect(task).toEqual(createdTask);
    });

    it('should throw NotFoundException when task not found', () => {
      expect(() => service.getTaskById(999)).toThrow(NotFoundException);
    });
  });

  describe('updateTask', () => {
    it('should update task title and description', () => {
      const createTaskDto = { title: 'Original Title', description: 'Original Description' };
      const createdTask = service.createTask(createTaskDto);

      const updateTaskDto: UpdateTaskDto = {
        title: 'Updated Title',
        description: 'Updated Description',
      };

      const updatedTask = service.updateTask(createdTask.id, updateTaskDto);

      expect(updatedTask.title).toBe('Updated Title');
      expect(updatedTask.description).toBe('Updated Description');
    });

    it('should partially update task', () => {
      const createTaskDto = { title: 'Original Title', description: 'Original Description' };
      const createdTask = service.createTask(createTaskDto);

      const updateTaskDto: UpdateTaskDto = { title: 'Updated Title' };

      const updatedTask = service.updateTask(createdTask.id, updateTaskDto);

      expect(updatedTask.title).toBe('Updated Title');
      expect(updatedTask.description).toBe('Original Description');
    });
  });

  describe('deleteTask', () => {
    it('should delete a task and return it', () => {
      const createTaskDto = { title: 'Task', description: 'Description' };
      const createdTask = service.createTask(createTaskDto);

      const deletedTask = service.deleteTask(createdTask.id);
      expect(deletedTask).toEqual(createdTask);
      expect(service.getAllTasks()).toHaveLength(0);
    });
  });

  describe('completeTask', () => {
    it('should mark a task as completed', () => {
      const createTaskDto = { title: 'Task', description: 'Description' };
      const createdTask = service.createTask(createTaskDto);

      const completedTask = service.completeTask(createdTask.id, true);
      expect(completedTask.completed).toBe(true);
    });

    it('should mark a task as uncompleted', () => {
      const createTaskDto = { title: 'Task', description: 'Description' };
      const createdTask = service.createTask(createTaskDto);

      service.completeTask(createdTask.id, true);
      const uncompletedTask = service.completeTask(createdTask.id, false);
      expect(uncompletedTask.completed).toBe(false);
    });
  });
});