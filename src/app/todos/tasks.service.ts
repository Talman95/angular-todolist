import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { GetTaskResponse } from 'src/app/core'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  fetchTasks(id: string) {
    return this.http
      .get<GetTaskResponse>(`${environment.baseUrl}/todo-lists/${id}/tasks`)
      .pipe(map(res => res.items))
  }
}
