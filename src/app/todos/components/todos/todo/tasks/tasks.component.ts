import { Component, Input, OnInit } from '@angular/core'
import { combineLatest, map, Observable } from 'rxjs'
import { TasksService } from 'src/app/todos/tasks.service'
import { Task } from 'src/app/core'
import { TaskStatus } from 'src/app/core/enums/task-status.enum'
import { TodosService } from 'src/app/todos/todos.service'
import { TodoFilter } from 'src/app/core/enums/todo-filter'

@Component({
  selector: 'todo-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  @Input() todoId!: string

  tasks$?: Observable<Task[]>

  constructor(
    private tasksService: TasksService,
    private todosService: TodosService
  ) {}

  filter!: TodoFilter

  ngOnInit() {
    this.tasks$ = combineLatest([
      this.tasksService.tasks$,
      this.todosService.todos$,
    ]).pipe(
      map(res => {
        const [tasks, todos] = res

        let currentTasks = tasks[this.todoId]
        const currentTodo = todos.find(({ id }) => id === this.todoId)

        if (currentTodo?.filter === TodoFilter.Active) {
          currentTasks = currentTasks.filter(
            ({ status }) => status === TaskStatus.New
          )
        }

        if (currentTodo?.filter === TodoFilter.Completed) {
          currentTasks = currentTasks.filter(
            ({ status }) => status === TaskStatus.Completed
          )
        }

        return currentTasks
      })
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
