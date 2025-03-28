export interface CreateReviewCommentPayload {
  id: number;
  userId: number;
  comment: string;
}

export interface GetReviewCommentByIdPayload {
  id: number;
}

export interface UpdateReviewCommentPayload {
  id: number;
  userId: number;
  comment: string;
}

export interface DeleteReviewCommentPayload {
  id: number;
  userId: number;
}

export interface ValidateReviewCommentPayload {
  id: number;
  userId: number;
}
