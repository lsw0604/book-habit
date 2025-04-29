export interface CreateMyBookTagPayload {
  myBookId: number;
  userId: number;
  value: string;
}

export type ResponseCreateMyBookTag = {
  myBookTagId: number;
  value: string;
};

export interface GetMyBookTagPayload {
  myBookId: number;
  userId: number;
}

export type ResponseGetMyBookTag = {
  myBookTagId: number;
  value: string;
}[];

export interface DeleteMyBookTagPayload {
  myBookTagId: number;
  userId: number;
}

export type ResponseDeleteMyBookTag = {
  myBookTagId: number;
};
