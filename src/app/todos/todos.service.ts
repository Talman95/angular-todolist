import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment'
import { BehaviorSubject, map } from 'rxjs'
import { CommonResponse, Todo, TodoEntity } from 'src/app/core'
import { TodoFilter } from 'src/app/core/enums/todo-filter'

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  todos$ = new BehaviorSubject<TodoEntity[]>([])

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`)
      .pipe(
        map(todos => {
          return todos.map(tl => ({
            ...tl,
            filter: TodoFilter.All,
          }))
        })
      )
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
          const newTodo: TodoEntity = {
            ...res.data.item,
            filter: TodoFilter.Active,
          }
          return [newTodo, ...this.todos$.getValue()]
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

  changeTodoFilter(todoId: string, filter: TodoFilter) {
    this.todos$.next(
      this.todos$
        .getValue()
        .map(todo => (todo.id === todoId ? { ...todo, filter } : todo))
    )
  }
}
