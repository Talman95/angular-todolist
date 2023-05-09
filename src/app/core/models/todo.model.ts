import { TodoFilter } from 'src/app/core/enums/todo-filter'

export interface Todo {
  id: string
  title: string
  addedDate: string
  order: number
}

export interface TodoEntity {
  id: string
  title: string
  addedDate: string
  order: number
  filter: TodoFilter
}
