type CreateMyBookTagPayload = Pick<Tag, 'tag'> & Pick<MyBook, 'id' | 'userId'>;
type GetMyBookTagPayload = Pick<MyBookTag, 'id'>;
type DeleteMyBookTagPayload = Pick<MyBookTag, 'id'> & Pick<MyBook, 'userId'>;
