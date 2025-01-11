import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CompleteTaskDto } from './dto/complete-task.dto';
import { Task } from './task.model';

describe('TaskController', () => {
  let controller: TaskController;
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: {
            createTask: jest.fn(),
            getAllTasks: jest.fn(),
            getTaskById: jest.fn(),
            updateTask: jest.fn(),
            deleteTask: jest.fn(),
            completeTask: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a task', () => {
      const createTaskDto: CreateTaskDto = { title: 'Test Task', description: 'Test Description' };
      const result: Task = { id: 1, title: 'Test Task', description: 'Test Description', completed: false };

      jest.spyOn(service, 'createTask').mockImplementation(() => result);

      expect(controller.createTask(createTaskDto)).toBe(result);
    });
  });

  describe('getAllTasks', () => {
    it('should return an array of tasks', () => {
      const result: Task[] = [{ id: 1, title: 'Test Task', description: 'Test Description', completed: false }];

      jest.spyOn(service, 'getAllTasks').mockImplementation(() => result);

      expect(controller.getAllTasks()).toBe(result);
    });
  });

  describe('getTaskById', () => {
    it('should return a task by ID', () => {
      const result: Task = { id: 1, title: 'Test Task', description: 'Test Description', completed: false };

      jest.spyOn(service, 'getTaskById').mockImplementation(() => result);

      expect(controller.getTaskById(1)).toBe(result);
    });
  });

  describe('updateTask', () => {
    it('should update a task', () => {
      const updateTaskDto: UpdateTaskDto = { title: 'Updated Task', description: 'Updated Description' };
      const result: Task = { id: 1, title: 'Updated Task', description: 'Updated Description', completed: false };

      jest.spyOn(service, 'updateTask').mockImplementation(() => result);

      expect(controller.updateTask(1, updateTaskDto)).toBe(result);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task', () => {
      const result: Task = { id: 1, title: 'Test Task', description: 'Test Description', completed: false };

      jest.spyOn(service, 'deleteTask').mockImplementation(() => result);

      expect(controller.deleteTask(1)).toBe(result);
    });
  });

  describe('completeTask', () => {
    it('should mark a task as completed', () => {
      const completeTaskDto: CompleteTaskDto = { completed: true };
      const result: Task = { id: 1, title: 'Test Task', description: 'Test Description', completed: true };

      jest.spyOn(service, 'completeTask').mockImplementation(() => result);

      expect(controller.completeTask(1, completeTaskDto)).toBe(result);
    });
  });
});