import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Todo } from 'src/app/core'

@Component({
  selector: 'todo-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  @Input() todo!: Todo
  @Output() removeEvent = new EventEmitter<string>()
  @Output() updateEvent = new EventEmitter<{ id: string; title: string }>()

  removeTodo() {
    this.removeEvent.emit(this.todo.id)
  }

  updateTitle(title: string) {
    this.updateEvent.emit({
      id: this.todo.id,
      title,
    })
  }
}
