/**
 * * 리뷰 댓글 생성에 필요한 데이터 인터페이스
 */
export interface CreateReviewCommentPayload {
  myBookReviewId: number;
  userId: number;
  comment: string;
}

/**
 * * 리뷰 댓글 수정에 필요한 데이터 인터페이스
 */
export interface UpdateReviewCommentPayload {
  reviewCommentId: number;
  userId: number;
  comment: string;
}

/**
 * * 리뷰 댓글 삭제에 필요한 데이터 인터페이스
 */
export interface DeleteReviewCommentPayload {
  reviewCommentId: number;
  userId: number;
}

/**
 * * 리뷰 댓글 삭제 후 반환되는 응답 인터페이스
 */
export type ResponseDeleteReviewComment = {
  reviewCommentId: number;
};
