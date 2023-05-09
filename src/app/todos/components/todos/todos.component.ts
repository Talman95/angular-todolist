import { Component, OnInit } from '@angular/core'
import { TodosService } from 'src/app/todos/todos.service'
import { Observable } from 'rxjs'
import { TodoEntity } from 'src/app/core'

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  todos$ = new Observable<TodoEntity[]>()

  ngOnInit() {
    this.todos$ = this.todosService.todos$

    this.todosService.getTodos()
  }

  addTodo(title: string) {
    this.todosService.addTodo(title)
  }

  removeTodo(id: string) {
    this.todosService.removeTodo(id)
  }

  updateTodo(data: { id: string; title: string }) {
    this.todosService.updateTodo(data.id, data.title)
  }
}
