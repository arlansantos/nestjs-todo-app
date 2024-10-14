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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoSwagger } from './swagger/create-todo.swagger';
import { IndexTodoSwagger } from './swagger/index-todo.swagger';
import { SelectTodoSwagger } from './swagger/select-todo.swagger';
import { UpdateTodoSwagger } from './swagger/update-todo.swagger';
import { TodoService } from './todo.service';

@Controller('todos')
@ApiTags('todos')
export class TodoController {
	constructor(private readonly todoService: TodoService) {}

	@Post()
	@ApiOperation({ summary: 'Criar uma tarefa' })
	@ApiResponse({
		status: 201,
		description: 'Tarefa criada',
		type: CreateTodoSwagger,
	})
	@ApiResponse({ status: 400, description: 'Dados inválidos' })
	async create(@Body() createTodoDto: CreateTodoDto) {
		return await this.todoService.create(createTodoDto);
	}

	@Get()
	@ApiOperation({ summary: 'Listar tarefas' })
	@ApiResponse({
		status: 200,
		description: 'Tarefas listadas',
		type: IndexTodoSwagger,
		isArray: true,
	})
	async index() {
		return await this.todoService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Buscar uma tarefa' })
	@ApiResponse({
		status: 200,
		description: 'Tarefa listada',
		type: SelectTodoSwagger,
	})
	@ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
	async select(@Param('id', new ParseUUIDPipe()) id: string) {
		return await this.todoService.findOneOrFail(id);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Atualizar uma tarefa' })
	@ApiResponse({
		status: 200,
		description: 'Tarefa atualizada',
		type: UpdateTodoSwagger,
	})
	@ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
	@ApiResponse({ status: 400, description: 'Dados inválidos' })
	async update(
		@Param('id', new ParseUUIDPipe()) id: string,
		@Body() data: UpdateTodoDto,
	) {
		return await this.todoService.update(id, data);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Remover uma tarefa' })
	@ApiResponse({ status: 204, description: 'Tarefa removida' })
	@ApiResponse({ status: 404, description: 'Tarefa não encontrada' })
	async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
		await this.todoService.delete(id);
	}
}
