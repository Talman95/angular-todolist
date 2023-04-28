import { TaskStatus } from 'src/app/core/enums/task-status.enum'

export interface GetTaskResponse {
  items: Task[]
  totalCount: number
  error: string
}

export interface Task extends UpdateTaskModel {
  id: string
  todoListId: string
  order: number
  addedDate: Date
}

export interface UpdateTaskModel {
  title: string
  description: string
  status: TaskStatus
  priority: number
  startDate: Date
  deadline: Date
}

export interface TasksState {
  [id: string]: Task[]
}
