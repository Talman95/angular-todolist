import { Component, Input } from '@angular/core'
import { Todo } from 'src/app/core'

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: Todo
}
