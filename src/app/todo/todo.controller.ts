import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Put,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Post()
	async create(@Body() createTodoDto: CreateTodoDto) {
		return await this.todoService.create(createTodoDto);
	}

	@Get()
	async index() {
		return await this.todoService.findAll();
	}

	@Get(':id')
	async select(@Param('id', new ParseUUIDPipe()) id: string) {
		return await this.todoService.findOneOrFail(id);
	}

	@Put(':id')
	async update(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() data: UpdateTodoDto,
	) {
		return await this.todoService.update(id, data);
	}

	@Delete(':id')
	async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
		await this.todoService.delete(id);
	}
}
