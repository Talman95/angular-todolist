export interface GetTaskResponse {
  items: Task[]
  totalCount: number
  error: string
}

export interface Task {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: Date
  deadline: Date
  id: string
  todoListId: string
  order: number
  addedDate: Date
}
