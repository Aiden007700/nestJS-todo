import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();

    if (status) {
        tasks = tasks.filter(task => task.status === status)
    }

    if (search) {
        tasks = tasks.filter(task => task.description.includes(search) || task.title.includes(search))
    }
    return tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find(task => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      status: TaskStatus.OPEN,
      title,
      description,
    };

    this.tasks.push(task);
    return task;
  }

  updateTaskById(id: string, what: string, payload: string): Task {
    let updatedTask: Task | null;
    this.tasks.forEach(task => {
      if (task.id === id) {
        task[what] = payload;
        updatedTask = task;
      }
    });
    return updatedTask;
  }

  deleteTaskById(id: string): Task {
    let deletedTask: Task | null = null;
    this.tasks = this.tasks.filter(task => {
      if (task.id == id) {
        deletedTask = task;
      }
      return task.id !== id;
    });

    return deletedTask;
  }
}
