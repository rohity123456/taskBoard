import { IStatus } from '@/lib/types';
import { baseApi } from '../../baseAPI';

interface GetStatusesResponse {
  data: {
    statuses: IStatus[];
    totalStatuses: number;
    pageNo: number;
    pageSize: number;
  };
  success: boolean;
}

export const statusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatuses: builder.query<GetStatusesResponse, void>({
      query: () => `/statuses`,
      providesTags: ['Statuses']
    }),
    createStatus: builder.mutation<IStatus, Partial<IStatus>>({
      query: (body) => ({
        url: '/statuses',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Statuses']
    }),
    updateStatus: builder.mutation<IStatus, Partial<IStatus>>({
      query: (body) => ({
        url: `/statuses/${body._id}`,
        method: 'PATCH',
        body: {
          name: body.name
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Statuses', id: arg._id }
      ]
    }),
    deleteStatus: builder.mutation<IStatus, Partial<IStatus>>({
      query: (body) => {
        return { url: `/statuses/${body._id}`, method: 'DELETE' };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Statuses', id: arg._id }
      ]
    })
  })
});

export const {
  useGetStatusesQuery,
  useCreateStatusMutation,
  useUpdateStatusMutation,
  useDeleteStatusMutation
} = statusApi;
