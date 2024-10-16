import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
	constructor(
		@InjectRepository(TodoEntity)
		private readonly todoRepository: Repository<TodoEntity>,
	) {}

	async create(data: CreateTodoDto): Promise<void> {
		try {
			await this.todoRepository.save(this.todoRepository.create(data));
		} catch (error) {
			throw new Error(error.message);
		}
	}

	async findAll(): Promise<TodoEntity[]> {
		try {
			return await this.todoRepository.find();
		} catch (error) {
			throw new Error(error.message);
		}
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

	async delete(id: string): Promise<void> {
		try {
			await this.todoRepository.softDelete({
				id,
			});
		} catch (error) {
			throw new Error(error.message);
		}
	}
}
