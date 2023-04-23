import { Component, OnInit } from '@angular/core'
import { TodosService } from 'src/app/todos/todos.service'
import { Observable } from 'rxjs'
import { Todo } from 'src/app/core'

@Component({
  selector: 'todo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todosService: TodosService) {}

  title = ''

  todos$ = new Observable<Todo[]>()

  ngOnInit() {
    this.todos$ = this.todosService.todos$

    this.todosService.getTodos()
  }

  addTodo() {
    if (this.title.trim() !== '') {
      this.todosService.addTodo(this.title)
      this.title = ''
    }
  }

  removeTodo(id: string) {
    this.todosService.removeTodo(id)
  }

  updateTodo(data: { id: string; title: string }) {
    this.todosService.updateTodo(data.id, data.title)
  }
}
