import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IItem } from '../models/IBoard'

export const ItemsAPI = createApi({
  reducerPath: 'itemsAPI',
  tagTypes: ['Items'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
  }),
  endpoints: (build) => ({
    fetchItemsByTask: build.query<IItem[], number>({
      query: (id: number) => ({
        url: `/tasks/${id}/items`,
      }),
      keepUnusedDataFor: 0.0001,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Items' as const, id })),
              { type: 'Items', id: 'LIST' },
            ]
          : [{ type: 'Items', id: 'LIST' }],
    }),
    addItem: build.mutation<IItem, Partial<IItem>>({
      query: (body) => ({
        url: '/items',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Items'],
    }),
    deleteItem: build.mutation({
      query: (id: number) => ({
        url: `items/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Items'],
    }),
    setItemDone: build.mutation<IItem, Partial<IItem>>({
      query: (body) => ({
        url: `items/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Items'],
    }),
  }),
})
