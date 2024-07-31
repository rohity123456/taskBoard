import CONSTANTS from '@/lib/constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: CONSTANTS['apiTimeout'],
  prepareHeaders: async (headers) => {
    const token = '';
    if (token) {
      headers.set('Authorization', `${token}`);
    }
    if (timezone) {
      headers.set('Timezone', timezone);
    }
    return headers;
  }
});

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQuery,
  tagTypes: ['Boards', 'Tasks', 'Statuses'],
  endpoints: (builder) => ({})
});
