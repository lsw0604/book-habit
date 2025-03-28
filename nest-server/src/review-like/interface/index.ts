export interface CreateReviewLikePayload {
  id: number;
  userId: number;
}

export interface GetReviewLikeByIdPayload {
  id: number;
}

export interface DeleteReviewLikePayload {
  id: number;
  userId: number;
}

export interface ValidateReviewLikePayload {
  id: number;
  userId: number;
}

export interface DuplicateReviewLikePayload {
  id: number;
  userId: number;
}
