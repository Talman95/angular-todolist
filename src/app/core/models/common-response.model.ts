export interface CommonResponse<T = {}> {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: T
}
