import { Component, Input, OnInit } from '@angular/core'
import { map, Observable } from 'rxjs'
import { TasksService } from 'src/app/todos/tasks.service'
import { Task } from 'src/app/core'
import { TaskStatus } from 'src/app/core/enums/task-status.enum'

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>
  title = ''

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks$ = this.tasksService.tasks$.pipe(
      map(state => state[this.todoId])
    )

    this.tasksService.fetchTasks(this.todoId)
  }

  addTask() {
    this.tasksService.addTask(this.todoId, this.title)
  }

  removeTask(data: { todoId: string; taskId: string }) {
    this.tasksService.removeTask(data.todoId, data.taskId)
  }

  updateTaskStatus(data: {
    todoId: string
    taskId: string
    status: TaskStatus
  }) {
    this.tasksService.updateTask(data.todoId, data.taskId, {
      status: data.status,
    })
  }
}
