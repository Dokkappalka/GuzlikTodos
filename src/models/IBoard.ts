export interface IItem {
  id: number
  name: string
  isDone: boolean
  taskId: number
}

export interface ITask {
  id: number
  title: string
  boardId: number
}

export interface IBoard {
  id: number
  title: string
}
