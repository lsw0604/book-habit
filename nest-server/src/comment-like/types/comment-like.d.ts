type getCommentLikePayload = Pick<CommentLike, 'id'>;
type DuplicateCommentLikePayload = Pick<MyBookComment, 'id'> & Pick<MyBook, 'userId'>;
type ValidateCommentLikePayload = Pick<CommentLike, 'id'> & Pick<MyBook, 'userId'>;
