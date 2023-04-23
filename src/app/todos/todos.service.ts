import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { BehaviorSubject, map } from 'rxjs'
import { CommonResponse, Todo } from 'src/app/core'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  todos$ = new BehaviorSubject<Todo[]>([])

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  addTodo(title: string) {
    this.http
      .post<CommonResponse<{ item: Todo }>>(
        `${environment.baseUrl}/todo-lists`,
        {
          title,
        }
      )
      .pipe(
        map(res => {
          return [res.data.item, ...this.todos$.getValue()]
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  removeTodo(id: string) {
    this.http
      .delete<CommonResponse>(`${environment.baseUrl}/todo-lists/${id}`)
      .pipe(
        map(() => {
          return this.todos$.getValue().filter(tl => tl.id !== id)
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }

  updateTodo(id: string, title: string) {
    this.http
      .put<CommonResponse>(`${environment.baseUrl}/todo-lists/${id}`, {
        title,
      })
      .pipe(
        map(() => {
          return this.todos$
            .getValue()
            .map(tl => (tl.id === id ? { ...tl, title } : tl))
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos)
      })
  }
}
