export interface CreateMyBookTagPayload {
  myBookId: number;
  userId: number;
  value: string;
}

export interface FindMyBookTagPayload {
  myBookId: number;
  tagId: number;
}

export interface DeleteMyBookTagPayload {
  id: number;
  userId: number;
}

export interface GetMyBookTagPayload {
  id: number;
}

export interface GetPopularTagsPayload {
  limit: number;
}

export interface GetSearchTagPayload {
  limit: number;
  query: string;
}

export interface MyBookTag {
  id: number;
  tagId: number;
  myBookId: number;
}

export interface PublicTag {
  id: number;
  value: string;
  count: number;
}

export interface ResponseMyBookTag {
  myBookId: number;
  myBookTagId: number;
  value: string;
}

export interface ResponseDeleteMyBookTag extends Omit<ResponseMyBookTag, 'value'> {}
