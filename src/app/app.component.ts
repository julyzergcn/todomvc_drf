import { Component } from '@angular/core';
import { Todo } from './models/todo';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  newTodoText = '';

  constructor(public todoService: TodoService) {}

  addTodo() {
    this.todoService.addTodoText(this.newTodoText);
    this.newTodoText = '';
  }

  editTodo(todo: Todo) {
    todo.editing = true;
  }
}
