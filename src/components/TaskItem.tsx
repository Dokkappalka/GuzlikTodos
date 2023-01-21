import React, { useState } from 'react'
import { ITask } from '../models/IBoard'
import { ItemsAPI } from '../services/ItemsService'
import { TasksAPI } from '../services/TasksService'
import ItemItem from './ItemItem'

import { useAppSelector } from '../hooks/redux'

interface PropTypes {
  task: ITask
}

const TaskItem = ({ task }: PropTypes) => {
  const { currentItem } = useAppSelector((state) => state.ItemsReducer)
  const [taskItem, setTaskItem] = useState('')
  const [itemError, setItemError] = useState('')
  const [deleteTask] = TasksAPI.useDeleteTaskMutation()
  const [addItem] = ItemsAPI.useAddItemMutation()
  const [setDone] = ItemsAPI.useSetItemDoneMutation()
  const {
    data: items,
    error,
    isLoading,
  } = ItemsAPI.useFetchItemsByTaskQuery(task.id, {
    refetchOnMountOrArgChange: true,
  })
  const handleAddItem = () => {
    if (taskItem.trim().length > 70) {
      setItemError('Too long note...')
    } else if (!taskItem.trim()) {
      setItemError('Please, enter note...')
    } else if (taskItem.trim()) {
      setTaskItem('')
      setItemError('')
      addItem({
        name: taskItem,
        taskId: task.id,
        isDone: false,
      })
    }
  }
  const dropCardHandler = async (e: any, task: ITask) => {
    //any убрать
    e.preventDefault()
    if (currentItem?.taskId !== task.id) {
      await setDone({ ...currentItem, taskId: task.id })
    }
  }
  return (
    <div
      onDrop={(e) => {
        dropCardHandler(e, task)
      }}
      onDragOver={(e) => {
        e.preventDefault()
      }}
      className='w-[300px]  min-h-[190px] h-min text-center border rounded-lg bg-emerald-300 bg-gradient-to-l from-sky-300 mr-5 text-white mb-5 pb-7'
    >
      {isLoading && <p className='text-lg pt-5'>Items loading...</p>}
      {error && <p className='text-lg bg-red-500 pt-5'>Error</p>}
      {!error && !isLoading && (
        <>
          <button
            className='mt-0 ml-[90%]'
            onClick={async () => {
              await deleteTask(task.id)
            }}
          >
            🗑️
          </button>
          <p className='mt-1 text-xl font-semibold'>{task.title}</p>
          <div className='flex items-center justify-center mt-5 h-7'>
            <input
              placeholder={items?.length ? '' : 'Create your first note...'}
              value={taskItem}
              onChange={(e) => {
                setTaskItem(e.target.value)
              }}
              onFocus={() => {
                setItemError('')
              }}
              onKeyUp={(e) => {
                e.key === 'Enter' && handleAddItem()
              }}
              className='bg-sky-100 px-1 text-black h-full rounded-l w-[250px]'
            />
            <button
              className='text-green-500 bg-sky-100 font-semibold text-xl h-full w-7 hover:bg-green-200 duration-200 rounded-r'
              onClick={handleAddItem}
            >
              +
            </button>
          </div>
          {!isLoading &&
            !error &&
            items?.map((item) => <ItemItem item={item} taskId={task.id} />)}
        </>
      )}
      <p className='text-red-500'>{itemError}</p>
    </div>
  )
}

export default TaskItem
