import { ITask } from '@/lib/types';
import { baseApi } from '../../baseAPI';
import { TaskInput } from '@/components/task/taskmodal/schema';

interface GetTasksResponse {
  data: {
    tasks: ITask[];
    totalTasks: number;
    pageNo: number;
    pageSize: number;
  };
  success: boolean;
}

type TaskQuery = {
  page?: string;
  pageSize?: string;
  boardId: string;
};

type TaskResponse = {
  data: ITask;
  success: boolean;
};

export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<GetTasksResponse, TaskQuery>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== null && value !== undefined) {
            searchParams.append(key, String(value));
          }
        });
        return `/tasks?${searchParams.toString()}`;
      },
      providesTags: ['Tasks']
    }),
    getTask: builder.query<TaskResponse, string>({
      query: (id) => `/tasks/${id}`,
      providesTags: ['Tasks']
    }),
    createTask: builder.mutation<TaskResponse, Partial<TaskInput>>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Tasks']
    }),
    updateTask: builder.mutation<TaskResponse, Partial<TaskInput>>({
      query: (body) => ({
        url: `/tasks/${body._id}`,
        method: 'PATCH',
        body: {
          title: body.title,
          description: body.description,
          status: body.status
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Tasks', id: arg._id }]
    }),
    deleteTask: builder.mutation<TaskResponse, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE'
      }),
      invalidatesTags: (result, error, taskId) => [
        { type: 'Tasks', id: taskId }
      ]
    })
  })
});

export const {
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation
} = taskApi;
