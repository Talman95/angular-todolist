import { Component, EventEmitter, Input, Output } from '@angular/core'
import { Task } from 'src/app/core'
import { TaskStatus } from 'src/app/core/enums/task-status.enum'

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

  @Output() updateTaskStatusEvent = new EventEmitter<{
    todoId: string
    taskId: string
    status: TaskStatus
  }>()

  taskStatus: typeof TaskStatus = TaskStatus

  removeTask() {
    this.removeTaskEvent.emit({
      todoId: this.task.todoListId,
      taskId: this.task.id,
    })
  }

  updateTaskStatus(e: Event) {
    const isChecked = (e.currentTarget as HTMLInputElement).checked

    const status = isChecked ? TaskStatus.Completed : TaskStatus.New

    this.updateTaskStatusEvent.emit({
      todoId: this.task.todoListId,
      taskId: this.task.id,
      status,
    })
  }
}
