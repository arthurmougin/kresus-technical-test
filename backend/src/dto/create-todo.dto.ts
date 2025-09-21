import { IsString, IsOptional, IsIn, MaxLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MaxLength(50)
  title: string;

  @IsString()
  @MaxLength(256)
  content: string;

  @IsString()
  @IsIn(['HIGH', 'MEDIUM', 'LOW'])
  priority: string;

  @IsOptional()
  @IsString()
  executionDate?: string; // format ISO ou à adapter
}
