export interface ReviewLike {
  id: number;
  userId: number;
  myBookReviewId: number;
}

export interface ResponseCheckDuplicateReviewLike {
  existReviewLike: boolean;
  reviewLike?: ReviewLike;
}

export interface CreateReviewLikePayload extends Omit<ReviewLike, 'myBookReviewId'> {}
export interface CheckDuplicateReviewLikePayload extends Omit<ReviewLike, 'myBookReviewId'> {}
export interface DeleteReviewLikePayload extends Omit<ReviewLike, 'myBookReviewId'> {}
export interface GetReviewLikeByIdPayload extends Pick<ReviewLike, 'id'> {}
export interface ValidateReviewLikePayload extends Omit<ReviewLike, 'myBookReviewId'> {}
