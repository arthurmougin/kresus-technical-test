import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getAllTodo(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  async createTodo(data: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({ data });
  }
}
