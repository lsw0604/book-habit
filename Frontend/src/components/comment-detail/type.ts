import { z } from 'zod';

export const schema = z.object({
  reply: z.string().min(1, {
    message: '댓글을 입력해주세요.',
  }),
});

export type InputType = z.infer<typeof schema>;
