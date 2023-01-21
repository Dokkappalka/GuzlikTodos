import React from 'react'
import NewBoard from '../components/NewBoard'
import { BoardsAPI } from '../services/BoardsService'
import { Link } from 'react-router-dom'

const MainPage = () => {
  const {
    data: boards,
    error,
    isLoading,
    isFetching,
  } = BoardsAPI.useFetchAllBoardsQuery(10)
  return (
    <div>
      {error && (
        <p className='text-center text-2xl text-red-500'>Unknown error</p>
      )}
      {isFetching && <p className='text-center text-2xl mb-5'>Loading...</p>}
      {!error && !isLoading && (
        <>
          <h1 className='text-center text-2xl block font-semibold mb-[50px]'>
            GuzlikTodos
          </h1>
          <div className='flex flex-wrap justify-start'>
            {boards?.map((board) => (
              <Link
                key={board.id}
                to={'/boards/' + board.id}
                className='h-[100px] w-[250px] rounded-xl flex justify-center items-center text-white font-semibold bg-blue-400 m-5 cursor-pointer hover:shadow-xl duration-200'
              >
                {board.title}
              </Link>
            ))}
            <NewBoard />
          </div>
        </>
      )}
    </div>
  )
}

export default MainPage
