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

  constructor(private tasksService: TasksService) {}

  ngOnInit() {
    this.tasks$ = this.tasksService.tasks$.pipe(
      map(state => state[this.todoId])
    )

    this.tasksService.fetchTasks(this.todoId)
  }

  addTask(title: string) {
    this.tasksService.addTask(this.todoId, title)
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

  updateTaskTitle(data: { todoId: string; taskId: string; title: string }) {
    this.tasksService.updateTask(data.todoId, data.taskId, {
      title: data.title,
    })
  }
}
