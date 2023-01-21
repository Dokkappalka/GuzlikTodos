import React from 'react'
import Board from '../components/Board'
import { IBoard } from '../models/IBoard'

interface PropTypes {
  board: IBoard
}

const BoardPage = ({ board }: PropTypes) => {
  return (
    <div>
      <Board board={board} />
    </div>
  )
}

export default BoardPage
