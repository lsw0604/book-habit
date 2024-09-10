type IdAndUserId = Pick<CommentReply, 'id' | 'userId'>;

type CreateCommentReplyPayload = Pick<CommentReply, 'myBookCommentId' | 'reply' | 'userId'>;
type GetCommentReplyPayload = Pick<CommentReply, 'id'>;
type UpdateCommentReplyPayload = IdAndUserId & Partial<Pick<CommentReply, 'reply'>>;
type DeleteCommentReplyPayload = IdAndUserId;
