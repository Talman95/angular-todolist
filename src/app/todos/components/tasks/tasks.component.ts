import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { TasksService } from 'src/app/todos/tasks.service'
import { Task } from 'src/app/core'

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
    this.tasks$ = this.tasksService.fetchTasks(this.todoId)
  }
}
