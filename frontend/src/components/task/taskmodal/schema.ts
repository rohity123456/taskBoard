import { z } from 'zod';

export const taskSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, 'Task title is required'),
  description: z.string(),
  status: z.string(),
  boardId: z.string()
});

export type TaskInput = z.infer<typeof taskSchema>;
