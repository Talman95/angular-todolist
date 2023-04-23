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

  isEditMode = false
  title = ''

  activateEditMode() {
    this.title = this.todo.title
    this.isEditMode = true
  }

  exitEditMode() {
    this.isEditMode = false
  }

  removeTodo() {
    this.removeEvent.emit(this.todo.id)
  }

  updateTodo() {
    this.updateEvent.emit({
      id: this.todo.id,
      title: this.title,
    })

    this.exitEditMode()
  }
}
