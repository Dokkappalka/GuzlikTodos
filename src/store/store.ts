import ItemsReducer from '../store/reducers/ItemsSlice'
import { TasksAPI } from './../services/TasksService'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { BoardsAPI } from '../services/BoardsService'
import { ItemsAPI } from '../services/ItemsService'

const rootReducer = combineReducers({
  ItemsReducer,
  [BoardsAPI.reducerPath]: BoardsAPI.reducer,
  [TasksAPI.reducerPath]: TasksAPI.reducer,
  [ItemsAPI.reducerPath]: ItemsAPI.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        BoardsAPI.middleware,
        TasksAPI.middleware,
        ItemsAPI.middleware
      ),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
