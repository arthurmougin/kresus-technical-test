import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  getAllTodo(qte: number, cursor: number): Promise<Todo[]> {
    if (qte == undefined || cursor == undefined) {
      return this.prisma.todo.findMany();
    }

    if (cursor < 0) {
      return this.prisma.todo.findMany({
        take: Number(qte),
        orderBy: {
          id: 'asc',
        },
      });
    }

    return this.prisma.todo.findMany({
      take: Number(qte),
      skip: 1,
      cursor: {
        id: Number(cursor),
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async createTodo(data: CreateTodoDto): Promise<Todo> {
    return this.prisma.todo.create({ data });
  }
}
