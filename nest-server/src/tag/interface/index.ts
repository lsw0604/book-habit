export interface SearchTagPayload {
  query: string;
  limit: number;
}

export type TagWithCount = {
  id: number;
  value: string;
  count: number;
};
