import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { CommonResponse, GetTaskResponse, Task, TasksState } from 'src/app/core'
import { BehaviorSubject, map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  tasks$ = new BehaviorSubject<TasksState>({})

  constructor(private http: HttpClient) {}

  fetchTasks(todoId: string) {
    this.http
      .get<GetTaskResponse>(`${environment.baseUrl}/todo-lists/${todoId}/tasks`)
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue()

          stateTasks[todoId] = res.items

          return stateTasks
        })
      )
      .subscribe(tasks => this.tasks$.next(tasks))
  }

  addTask(todoId: string, title: string) {
    this.http
      .post<CommonResponse<{ item: Task }>>(
        `${environment.baseUrl}/todo-lists/${todoId}/tasks`,
        {
          title,
        }
      )
      .pipe(
        map(res => {
          const stateTasks = this.tasks$.getValue()

          stateTasks[todoId] = [res.data.item, ...stateTasks[todoId]]

          return stateTasks
        })
      )
      .subscribe(tasks => this.tasks$.next(tasks))
  }
}
