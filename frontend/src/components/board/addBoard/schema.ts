import { z } from 'zod';

export const boardSchema = z.object({
  title: z.string().min(1, 'Board title is required')
});

export type BoardInput = z.infer<typeof boardSchema>;
