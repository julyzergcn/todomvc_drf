import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { Todo } from '../models/todo';

const BASE_URL = 'http://localhost:5000/api'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Array<Todo> = [];
  todosUrl: string = `${BASE_URL}/todos/`;

  constructor(private httpClient: HttpClient) {
    this.fetchTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  fetchTodos(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.todosUrl).pipe(
      // switchMap((obj: Todo) => of([new Todo(obj.title, obj.completed)])),
      // tap(_ => console.log('fetched todos')),
      catchError(this.handleError<Todo[]>('fetchTodos', []))
    );
  }

  addTodoText(todoText: string) {
    if (todoText.trim().length == 0)
      return;
    let newTodo = new Todo(todoText);
    this.httpClient.post<Todo>(this.todosUrl, newTodo).pipe(
      catchError(this.handleError<Todo>('addTodo'))
    ).subscribe(todo => {
      this.todos = [todo, ...this.todos];
    });
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
    this.httpClient.get(`${this.todosUrl}set-all-completed/`).pipe(
      catchError(this.handleError<Todo>('setAllCompletedTodos'))
    ).subscribe(_ => {
      // this.todos.forEach(todo => todo.completed = completed);
      this.fetchTodos().subscribe(todos => {
        this.todos = todos;
      });
    });
  }

  removeTodo(todo: Todo) {
    this.httpClient.delete(`${this.todosUrl}${todo.pk}/`).pipe(
      catchError(this.handleError<Todo>('removeTodo'))
    ).subscribe(_ => {
      this.todos.splice(this.todos.indexOf(todo), 1);
    });
  }

  removeCompleted() {
    this.httpClient.get(`${this.todosUrl}clear-completed/`).pipe(
      catchError(this.handleError<Todo>('clearCompletedTodos'))
    ).subscribe(_ => {
      // this.todos = this.getRemaining();
      this.fetchTodos().subscribe(todos => {
        this.todos = todos;
      });
    });
  }

  toggleCompletion(todo: Todo) {
    let todoData = Object.assign({}, todo, {completed: !todo.completed});
    this.httpClient.put(`${this.todosUrl}${todo.pk}/`, todoData).pipe(
      catchError(this.handleError<Todo>('updateTodo'))
    ).subscribe(_ => {
      todo.completed = !todo.completed;
    });
  }

  updateEditingTodo(todo: Todo, newText: string) {
    let todoData = Object.assign({}, todo, {title: newText});
    this.httpClient.put(`${this.todosUrl}${todo.pk}/`, todoData).pipe(
      catchError(this.handleError<Todo>('updateTodo'))
    ).subscribe(_ => {
      todo.title = newText;
      todo.editing = false;
    });
  }

  stopEditingTodo(todo: Todo, newText: string) {
    this.updateEditingTodo(todo, newText);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
