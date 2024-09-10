type CreateMyBookCommentPayload = Pick<MyBookComment, 'comment' | 'isPublic' | 'myBookId'> &
  Pick<MyBook, 'userId'>;
type GetPublicMyBookCommentListPayload = undefined;
type GetPublicMyBookCommentDetailPayload = Pick<MyBookComment, 'id'>;
type GetMyBookCommentPayload = Pick<MyBookComment, 'id'>;
type UpdateMyBookCommentPayload = Partial<Pick<MyBookComment, 'comment' | 'isPublic'>> &
  Pick<MyBookComment, 'id'> &
  Pick<MyBook, 'userId'>;
type DeleteMyBookCommentPayload = Pick<MyBookComment, 'id'> & Pick<MyBook, 'userId'>;
