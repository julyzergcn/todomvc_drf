import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';

const BASE_URL = 'http://localhost:5000/api'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Array<Todo> = [];
  todosUrl: string = `${BASE_URL}/todos/`;

  constructor(private http: HttpClient) {
    this.http.get(this.todosUrl).subscribe(res => {
      console.log(res);
    });
  }

  addTodoText(todoText: string) {
    this.todos.push(new Todo(todoText));
  }

  allCompleted() {
    return this.todos.length == this.getCompleted().length;
  }

  getCompleted() {
    return this.todos.filter(todo => todo.completed);
  }

  getRemaining() {
    return this.todos.filter(todo => !todo.completed);
  }

  setAllTo(completed: boolean) {
    this.todos.forEach(todo => todo.completed = completed);
  }

  removeTodo(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
  }

  removeCompleted() {
    this.todos = this.getRemaining();
  }

  toggleCompletion(todo: Todo) {
    todo.completed = !todo.completed;
  }

  updateEditingTodo(todo: Todo, newText: string) {
    todo.title = newText;
    todo.editing = false;
  }

  stopEditingTodo(todo: Todo, newText: string) {
    this.updateEditingTodo(todo, newText);
  }
}
