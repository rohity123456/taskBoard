import { IBoard } from '@/lib/types';
import { baseApi } from '../../baseAPI';

interface GETBOARDS {
  data: {
    boards: IBoard[];
    totalBoards: number;
    pageNo: number;
    pageSize: number;
  };
  success: boolean;
}
type BoardQuery = {
  page: string;
  pageSize: string;
  q?: string;
};

type BoardResponse = {
  data: IBoard;
  success: boolean;
};
export const boardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<GETBOARDS, BoardQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            searchParams.append(key, String(value));
          }
        });
        return `/boards?${searchParams.toString()}`;
      },
      providesTags: ['Boards']
    }),
    getBoard: builder.query<BoardResponse, string>({
      query: (id) => `/boards/${id}`,
      providesTags: ['Boards']
    }),
    createBoard: builder.mutation<IBoard, Partial<IBoard>>({
      query: (body: Partial<IBoard>) => ({
        url: '/boards',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Boards']
    }),
    updateBoard: builder.mutation<IBoard, Partial<IBoard>>({
      query: (body) => {
        const boardBody = { ...body };
        delete boardBody._id;
        if ('assignedTo' in boardBody) {
          delete boardBody.assignedTo;
        }
        return { url: `/boards/${body._id}`, method: 'PATCH', body: boardBody };
      },
      invalidatesTags: ['Boards']
    }),
    deleteBoard: builder.mutation<IBoard, Partial<IBoard>>({
      query: (body) => {
        return { url: `/boards/${body._id}`, method: 'DELETE' };
      },
      invalidatesTags: ['Boards']
    })
  })
});

export const {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardQuery
} = boardApi;
