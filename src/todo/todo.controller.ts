import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Todo | undefined {
    return this.todoService.findOne(Number(id));
  }

  @Post()
  create(@Body() todo: Omit<Todo, 'id'>): Todo {
    return this.todoService.create(todo);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatedTodo: Partial<Todo>,
  ): Todo | undefined {
    return this.todoService.update(Number(id), updatedTodo);
  }

  @Delete(':id')
  delete(@Param('id') id: string): boolean {
    return this.todoService.delete(Number(id));
  }
}
