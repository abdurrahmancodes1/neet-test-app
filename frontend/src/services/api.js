import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include', // Automatically attaches HTTP-only session cookies
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Test', 'Question', 'Result'],
  endpoints: () => ({}),
});
