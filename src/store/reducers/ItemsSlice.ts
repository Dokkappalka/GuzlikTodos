import { IItem } from '../../models/IBoard'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ItemsState {
  currentItem: IItem | null
  currentTaskId: number | null
}

const initialState: ItemsState = {
  currentItem: null,
  currentTaskId: null,
}

export const ItemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addCurrentItem(state, action: PayloadAction<IItem>) {
      state.currentItem = action.payload
    },
    addCurrentTaskId(state, action: PayloadAction<number>) {
      state.currentTaskId = action.payload
    },
  },
})

export default ItemsSlice.reducer
