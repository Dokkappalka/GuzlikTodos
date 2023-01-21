import React, { useEffect, useState, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { IItem } from '../models/IBoard'
import { ItemsAPI } from '../services/ItemsService'
import { ItemsSlice } from '../store/reducers/ItemsSlice'

interface PropTypes {
  item: IItem
  taskId: number
}

const ItemItem = ({ item, taskId }: PropTypes) => {
  const dispatch = useAppDispatch()
  const { currentItem } = useAppSelector((state) => state.ItemsReducer)
  const { addCurrentItem, addCurrentTaskId } = ItemsSlice.actions
  const ref = useRef<HTMLDivElement>(null)
  const containerClasses =
    'flex items-center justify-between px-3 mx-3 pb-1 border mt-3 hover:shadow-md duration-200 cursor-pointer rounded-lg bg-sky-400 bg-gradient-to-l from-emerald-400 '
  const [clicked, setClicked] = useState(false)
  const { isFetching } = ItemsAPI.useFetchItemsByTaskQuery(taskId)
  const [setDone] = ItemsAPI.useSetItemDoneMutation()
  const [deleteItem] = ItemsAPI.useDeleteItemMutation()
  const handleDelete = async (id: number) => {
    await deleteItem(id)
  }

  useEffect(() => {
    if (!isFetching) {
      setClicked(false)
    }
  }, [isFetching]) //Это работает. Не уверен, правильно ли так делать

  const dragOverHandler = (e: any) => {
    //any потом убрать
    e.preventDefault()
    if (e.target.id === 'test' && ref.current !== null) {
      ref.current.style.boxShadow = '0 4px 3px gray'
    }
  }
  const dragLeaveHandler = () => {
    if (ref.current !== null) {
      ref.current.style.boxShadow = 'none'
    }
  }
  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    taskId: number,
    item: IItem
  ) => {
    dispatch(addCurrentItem(item))
    console.log(currentItem)
    dispatch(addCurrentTaskId(taskId))
  }
  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (ref.current !== null) {
      ref.current.style.boxShadow = 'none'
    }
  }
  const dropHandler = (
    //any убрать
    e: any
  ) => {
    e.preventDefault()
    if (ref.current !== null) {
      ref.current.style.boxShadow = 'none'
    }
    // console.log(currentItem)
    // await setDone({ ...currentItem, taskId: taskId })
  }

  return (
    <div
      draggable={true}
      ref={ref}
      id='test'
      onDragOver={(e) => {
        dragOverHandler(e)
      }}
      onDragLeave={(e) => {
        dragLeaveHandler()
      }}
      onDragStart={(e) => {
        dragStartHandler(e, taskId, item)
      }}
      onDragEnd={(e) => {
        dragEndHandler(e)
      }}
      onDrop={(e) => {
        dropHandler(e)
      }}
      className={containerClasses}
    >
      <p
        id='test'
        className={
          'break-words w-[200px] text-start font-semibold ' +
          (item.isDone && 'line-through')
        }
      >
        {item.name}
      </p>
      <div className='flex' id='test'>
        <input
          id='test'
          type='checkbox'
          className='mr-1 bg-blue-400'
          checked={item.isDone}
          onChange={() => {
            setDone({ ...item, isDone: !item.isDone })
            setClicked(true)
          }}
          disabled={clicked}
        />
        <button
          id='test'
          onClick={() => {
            handleDelete(item.id)
            setClicked(true)
          }}
          disabled={clicked}
        >
          ❌
        </button>
      </div>
    </div>
  )
}

export default ItemItem
