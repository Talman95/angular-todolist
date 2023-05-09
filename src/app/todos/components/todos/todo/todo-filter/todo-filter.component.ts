import { Component, Input } from '@angular/core'
import { TodoFilter } from 'src/app/core/enums/todo-filter'
import { TodosService } from 'src/app/todos/todos.service'

@Component({
  selector: 'todo-todo-filter',
  templateUrl: './todo-filter.component.html',
  styleUrls: ['./todo-filter.component.scss'],
})
export class TodoFilterComponent {
  constructor(private todosService: TodosService) {}

  @Input() todoId!: string
  @Input() filter!: TodoFilter
  todoFilter: typeof TodoFilter = TodoFilter

  onTodoFilterClick(filter: TodoFilter) {
    this.todosService.changeTodoFilter(this.todoId, filter)
  }
}
