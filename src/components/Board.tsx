import React from 'react'
import { IBoard } from '../models/IBoard'
import NewTask from './NewTask'
import { TasksAPI } from '../services/TasksService'
import { BoardsAPI } from '../services/BoardsService'
import TaskItem from './TaskItem'
import { useNavigate } from 'react-router-dom'

interface PropTypes {
  board: IBoard
}

const Board = ({ board }: PropTypes) => {
  const navigate = useNavigate()
  const [deleteBoard] = BoardsAPI.useDeleteBoardMutation()
  const [deleteTask] = TasksAPI.useDeleteTaskMutation()
  const {
    data: tasks,
    error,
    isLoading,
    isFetching,
  } = TasksAPI.useFetchTasksByBoardQuery(board.id)
  return (
    <div className='mt-5 w-full'>
      {error && (
        <p className='text-center text-2xl text-red-500'>Unknown error</p>
      )}
      {isFetching && <p className='text-center text-2xl'>Loading...</p>}
      {!isLoading && !error && (
        <div>
          <div className='flex items-center justify-between'>
            <p className='min-w-[300px] max-w-[45%] w-fit text-center px-[40px] py-5 block text-3xl font-semibold text-white bg-cyan-400 rounded-lg'>
              {board.title}
            </p>
            <button
              className='border px-2 py-1 rounded-lg text-white text-lg bg-red-500 hover:bg-red-300 duration-200'
              onClick={async () => {
                tasks?.map(async (t) => {
                  if (t.boardId === board.id) {
                    await deleteTask(t.id)
                  }
                })
                await deleteBoard(board.id)
                navigate('/')
              }}
            >
              Delete board
            </button>
          </div>
          <div className='mt-[5%] mx-auto flex flex-wrap w-full'>
            {tasks?.map((task) => (
              <TaskItem task={task} key={task.id} />
            ))}
            <NewTask boardId={board.id} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Board
