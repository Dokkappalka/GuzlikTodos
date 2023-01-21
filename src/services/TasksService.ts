import { ITask } from './../models/IBoard'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const TasksAPI = createApi({
  reducerPath: 'tasksAPI',
  tagTypes: ['Tasks'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  endpoints: (build) => ({
    fetchTasksByBoard: build.query<ITask[], number>({
      query: (id: number) => ({
        url: `/boards/${id}/tasks`,
      }),
      keepUnusedDataFor: 0.0001,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Tasks' as const, id })),
              { type: 'Tasks', id: 'LIST' },
            ]
          : [{ type: 'Tasks', id: 'LIST' }],
    }),
    addTask: build.mutation<ITask, Partial<ITask>>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTask: build.mutation({
      query: (id: number) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
})
