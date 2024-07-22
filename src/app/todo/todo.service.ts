import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Repository } from 'typeorm';
import { TodoEntity } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}

  async create(data: CreateTodoDto): Promise<void> {
    await this.todoRepository.save(this.todoRepository.create(data));
  }

  async findAll(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async findOneOrFail(id: string): Promise<TodoEntity> {
    try {
      return await this.todoRepository.findOneOrFail({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`task with id: ${id} not found`);
    }
  }

  async update(id: string, data: UpdateTodoDto): Promise<void> {
    try {
      await this.findOneOrFail(id);
      await this.todoRepository.update(id, data);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
