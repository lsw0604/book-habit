export interface CreateMyBookReviewPayload {
  myBookId: number;
  userId: number;
  review: string;
  isPublic: boolean;
}

export interface GetMyBookReviewListPayload {
  myBookId: number;
}

export interface GetMyBookReviewByIdPayload {
  id: number;
}

export interface UpdateMyBookReviewPayload {
  myBookReviewId: number;
  userId: number;
  isPublic?: boolean;
  review?: string;
}

export interface DeleteMyBookReviewPayload {
  myBookReviewId: number;
  userId: number;
}
