import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import BoardPage from './pages/BoardPage'
import MainPage from './pages/MainPage'
import { BoardsAPI } from './services/BoardsService'

function App() {
  const { data: boards } = BoardsAPI.useFetchAllBoardsQuery(10)
  return (
    <>
      <div className='sticky top-0'>
        <Header />
      </div>
      <div className='w-[80%] mx-auto py-5 border min-h-[100vh] px-5'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          {boards?.map((board) => (
            <Route
              key={board.id}
              path={'/boards/' + board.id}
              element={<BoardPage board={board} />}
            />
          ))}
        </Routes>
      </div>
    </>
  )
}

export default App
