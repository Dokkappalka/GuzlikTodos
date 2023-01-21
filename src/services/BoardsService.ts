import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IBoard } from '../models/IBoard'

export const BoardsAPI = createApi({
  reducerPath: 'boardsAPI',
  tagTypes: ['Boards'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  endpoints: (build) => ({
    fetchAllBoards: build.query<IBoard[], number>({
      query: () => ({
        url: '/boards',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Boards' as const, id })),
              { type: 'Boards', id: 'LIST' },
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),
    addBoard: build.mutation<IBoard, Partial<IBoard>>({
      query: (body) => ({
        url: '/boards',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Boards'],
    }),
    deleteBoard: build.mutation({
      query: (id: number) => ({
        url: `/boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Boards'],
    }),
  }),
})
