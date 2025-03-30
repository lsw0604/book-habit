export interface ReviewLike {
  id: number;
  userId: number;
  myBookReviewId: number;
}

export interface ResponseToggleReviewLike {
  action: 'created' | 'deleted';
  reviewLike: ReviewLike;
}

export interface ToggleReviewLIkePayload extends Pick<ReviewLike, 'userId' | 'myBookReviewId'> {}
export interface CreateReviewLikePayload extends Pick<ReviewLike, 'userId' | 'myBookReviewId'> {}
export interface DeleteReviewLikePayload extends Pick<ReviewLike, 'id' | 'userId'> {}
export interface GetReviewLikeByIdPayload extends Pick<ReviewLike, 'id'> {}
export interface ValidateReviewLikePayload extends Pick<ReviewLike, 'id' | 'userId'> {}
export interface FindUserReviewLikePayload extends Pick<ReviewLike, 'userId' | 'myBookReviewId'> {}
