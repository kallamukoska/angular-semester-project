import { Injectable } from '@angular/core';
import { ITodo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  lastId: number = 1;
  todos: ITodo[] = [{
    id: 1,
    title: "Test Title",
    description: "Test Description",
    status : 'OPEN',
    isVisible: true
  }];
  
  constructor() { }

  getAllTodo() {
    return this.todos;
  }

  addTodo(data: ITodo){
    data.id = ++this.lastId;
    this.todos.push(data);
  }
}
