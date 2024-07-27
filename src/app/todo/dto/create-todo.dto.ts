import { IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
	@IsNotEmpty({ message: 'the "task" parameter should not be empty' })
	task: string;

	@IsNotEmpty({ message: 'the "isDone" parameter should not be empty' })
	isDone: boolean;
}
