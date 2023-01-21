import React, { useState } from 'react'
import { BoardsAPI } from '../services/BoardsService'

const NewTask = () => {
  const [addBoard] = BoardsAPI.useAddBoardMutation()

  const [chosen, setChosen] = useState(false)
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const createBoard = () => {
    if (title.trim().length > 25) {
      setError('Too long title...')
    } else if (!title.trim()) {
      setError('Please, enter title...')
    } else if (title.trim()) {
      addBoard({ title: title })
      console.log('Normalbno: ', title)
      setTitle('')
      setChosen(false)
    }
  }
  return (
    <div
      className={
        'min-h-[100px] min-w-[250px] rounded-xl flex justify-center items-center text-white font-semibold bg-cyan-400 m-5 ' +
        (!chosen && 'cursor-pointer hover:shadow-xl duration-200')
      }
      onClick={() => {
        !chosen && setChosen(true)
      }}
    >
      {chosen ? (
        <div className='text-center py-2'>
          <p>Enter new task title</p>
          <input
            placeholder='Do something...'
            className='border-black my-5 text-black px-1 py-1 rounded-lg'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
            onFocus={() => {
              setError('')
            }}
          />
          <div className='flex justify-between items-center'>
            <button
              className='border rounded bg-green-500 px-3 py-1 hover:bg-green-300 duration-200'
              onClick={createBoard}
            >
              Create
            </button>
            <button
              className='border rounded bg-red-500 px-3 py-1 hover:bg-red-300 duration-200'
              onClick={() => {
                setChosen(false)
                setTitle('')
                setError('')
              }}
            >
              Cancel
            </button>
          </div>
          <p className='mt-3 font-thin'>{error}</p>
        </div>
      ) : (
        <p className='text-xl'>Create new board</p>
      )}
    </div>
  )
}

export default NewTask
