type CreateCommentLikeDTO = Pick<CommentLike, 'myBookCommentId' | 'userId'>;
type DeleteCommentLikeDTO = Pick<CommentLike, 'id' | 'userId'>;
type FindCommentLikeDTO = Pick<CommentLike, 'id'>;
type ValidateCommentLikeDTO = Pick<CommentLike, 'id' | 'userId'>;
type ValidateCreateCommentLikeDTO = Pick<CommentLike, 'myBookCommentId' | 'userId'>;
