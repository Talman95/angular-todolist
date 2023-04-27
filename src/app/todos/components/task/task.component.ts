import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task } from 'src/app/core'

@Component({
  selector: 'todo-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task!: Task
  @Output() removeTaskEvent = new EventEmitter<{
    todoId: string
    taskId: string
  }>()

  removeTask() {
    this.removeTaskEvent.emit({
      todoId: this.task.todoListId,
      taskId: this.task.id,
    })
  }
}
