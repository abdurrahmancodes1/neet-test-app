import { api } from '../../services/api.js';

export const resultsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getResultById: builder.query({
      query: (resultId) => `/results/${resultId}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, resultId) => [{ type: 'Result', id: resultId }],
    }),
  }),
});

export const { useGetResultByIdQuery } = resultsApiSlice;
