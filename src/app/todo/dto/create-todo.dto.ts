import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
	@ApiProperty()
	@IsNotEmpty({ message: 'the "task" parameter should not be empty' })
	task: string;

	@IsNotEmpty({ message: 'the "isDone" parameter should not be empty' })
	@ApiProperty()
	isDone: boolean;
}
