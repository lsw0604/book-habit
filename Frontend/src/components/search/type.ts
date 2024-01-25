import { z } from 'zod';

export const schema = z.object({
  search: z.string().min(1, {
    message: '검색어를 입력해주세요.',
  }),
});

export type InputType = z.infer<typeof schema>;
