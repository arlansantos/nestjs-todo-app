import { ApiProperty } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
	@PrimaryGeneratedColumn('uuid')
	@ApiProperty()
	id: string;

	@Column()
	@ApiProperty()
	task: string;

	@Column({ name: 'is_done', default: false })
	@ApiProperty()
	isDone: boolean;

	@CreateDateColumn({ name: 'created_at' })
	@ApiProperty()
	createdAt: string;

	@UpdateDateColumn({ name: 'updated_at' })
	@ApiProperty()
	updatedAt: string;

	@DeleteDateColumn({ name: 'deleted_at' })
	@ApiProperty()
	deletedAt: string;
}
