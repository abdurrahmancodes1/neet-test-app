import { api } from '../../services/api.js';

export const testsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTests: builder.query({
      query: (params = {}) => {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page);
        if (params.limit) queryParams.append('limit', params.limit);
        if (params.subject) queryParams.append('subject', params.subject);
        if (params.type) queryParams.append('type', params.type);
        if (params.search) queryParams.append('search', params.search);
        const qs = queryParams.toString();
        return `/tests${qs ? `?${qs}` : ''}`;
      },
      transformResponse: (response) => response.data || [],
      providesTags: (result = []) => [
        { type: 'Test', id: 'LIST' },
        ...result.map((test) => ({ type: 'Test', id: test._id || test.slug })),
      ],
    }),

    getTestById: builder.query({
      query: (testIdOrSlug) => `/tests/${testIdOrSlug}`,
      transformResponse: (response) => response.data,
      providesTags: (result, error, testIdOrSlug) => [{ type: 'Test', id: testIdOrSlug }],
    }),

    verifyTestAccess: builder.mutation({
      query: ({ testId, testCode }) => ({
        url: '/tests/access',
        method: 'POST',
        body: { testId, testCode },
      }),
      transformResponse: (response) => response.data,
    }),

    getTestQuestions: builder.query({
      query: (testIdOrSlug) => `/tests/${testIdOrSlug}/questions`,
      transformResponse: (response) => response.data || [],
      providesTags: (result, error, testIdOrSlug) => [{ type: 'Question', id: `TEST_${testIdOrSlug}` }],
    }),

    submitTest: builder.mutation({
      query: ({ testId, ...body }) => ({
        url: `/tests/${testId}/submit`,
        method: 'POST',
        body,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: (result, error, { testId }) => [
        { type: 'Result', id: 'LIST' },
        { type: 'Test', id: testId },
      ],
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetTestByIdQuery,
  useVerifyTestAccessMutation,
  useGetTestQuestionsQuery,
  useSubmitTestMutation,
} = testsApiSlice;
