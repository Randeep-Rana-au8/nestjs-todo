import { Injectable } from '@nestjs/common';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = []; // In-memory storage
  private idCounter = 1; // For unique IDs

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo | undefined {
    return this.todos.find((todo) => todo.id === id);
  }


  create(todo: Omit<Todo, 'id'>): Todo {
    const newTodo = { id: this.idCounter++, ...todo };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: number, updatedTodo: Partial<Todo>): Todo | undefined {
    const todoIndex = this.todos.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) return undefined;

    this.todos[todoIndex] = { ...this.todos[todoIndex], ...updatedTodo };
    return this.todos[todoIndex];
  }

  delete(id: number): boolean {
    const initialLength = this.todos.length;
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return this.todos.length < initialLength;
  }
}
