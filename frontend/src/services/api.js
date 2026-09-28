import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE } from '../utils/auth.js';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    credentials: 'include', // Automatically attaches HTTP-only session cookies
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ['Test', 'Question', 'Result'],
  endpoints: () => ({}),
});
