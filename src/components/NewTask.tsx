import React, { useState } from 'react'
import { TasksAPI } from '../services/TasksService'

interface PropTypes {
  boardId: number
}

const NewTask = ({ boardId }: PropTypes) => {
  const [addTask] = TasksAPI.useAddTaskMutation()
  const [taskTitle, setTaskTitle] = useState('')
  const [chosen, setChosen] = useState(false)
  const [error, setError] = useState('')
  const createTask = (id: number) => {
    if (taskTitle.trim().length > 20) {
      setError('Too long task...')
    } else if (!taskTitle.trim()) {
      setError('Please, enter task...')
    } else if (taskTitle.trim()) {
      addTask({ title: taskTitle, boardId: id })
      setTaskTitle('')
      setChosen(false)
    }
  }
  return (
    <div
      className={
        'border rounded-lg w-[300px] max-h-[200px] min-h-[75px] h-min text-center bg-sky-500 pb-3 text-white ' +
        (!chosen &&
          'cursor-pointer hover:shadow-lg hover:bg-emerald-300 duration-200')
      }
      onClick={() => {
        !chosen && setChosen(true)
      }}
    >
      <p className='font-semibold text-lg mt-2'>Add new task</p>
      {chosen && (
        <>
          <input
            value={taskTitle}
            onChange={(e) => {
              setTaskTitle(e.target.value)
            }}
            onFocus={() => {
              setError('')
            }}
            className='border w-[250px] rounded h-[30px] mt-5 px-1 text-black'
            placeholder='Give me a name... '
          />
          <div className='flex justify-between items-center mt-4 w-[250px] mx-auto'>
            <button
              className='border rounded px-3 py-1 bg-green-500 hover:bg-green-300 duration-200 text-white'
              onClick={() => {
                createTask(boardId)
              }}
            >
              Create
            </button>
            <button
              className='border rounded px-3 py-1 bg-red-500 hover:bg-red-300 duration-200 text-white'
              onClick={() => {
                setChosen(false)
                setError('')
                setTaskTitle('')
              }}
            >
              Cancel
            </button>
          </div>
          <p className='text-red-500 mt-3'>{error}</p>
        </>
      )}
    </div>
  )
}

export default NewTask
