/**
 * * 리뷰 댓글 생성에 필요한 데이터 인터페이스
 */
export interface CreateReviewCommentPayload {
  /** 댓글이 달릴 리뷰의 ID */
  myBookReviewId: number;
  /** 댓글 작성자의 사용자 ID */
  userId: number;
  /** 댓글 내용 */
  comment: string;
}

/**
 * * 리뷰 댓글 수정에 필요한 데이터 인터페이스
 */
export interface UpdateReviewCommentPayload {
  /** 수정할 댓글의 ID */
  id: number;
  /** 댓글을 수정하려는 사용자의 ID (권한 검증용) */
  userId: number;
  /** 수정할 댓글 내용 */
  comment: string;
}

/**
 * * 리뷰 댓글 삭제에 필요한 데이터 인터페이스
 */
export interface DeleteReviewCommentPayload {
  /** 삭제할 댓글의 ID */
  id: number;
  /** 댓글을 삭제하려는 사용자의 ID (권한 검증용) */
  userId: number;
}

/**
 * * 리뷰 댓글 삭제 후 반환되는 응답 인터페이스
 */
export interface DeleteReviewCommentResponse {
  /** 삭제된 댓글의 ID */
  id: number;
}

/**
 * * 리뷰 댓글 권한 검증에 필요한 데이터 인터페이스
 */
export interface ValidateReviewCommentPayload {
  /** 검증할 댓글의 ID */
  id: number;
  /** 권한을 확인할 사용자의 ID */
  userId: number;
}
