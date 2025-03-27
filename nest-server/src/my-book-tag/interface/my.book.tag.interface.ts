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

export interface MyBookTag {
  id: number;
  myBookId: number;
  tagId: number;
}
