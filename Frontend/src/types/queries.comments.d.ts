// useCommentsListQuery의 타입들

type CommentsListResponseType = {
  comments: CommentsListType;
};
type CommentsListType = CommentsItemType[];
type CommentsItemType = {
  comment_id: number;
  comment: string;
  created_at: Date;
  rating: number;
  title: string;
  name: string;
};

// useCommentsLikeListQuery의 타입들

type CommentsLikeListResponseType = {
  comment_likes: CommentsLikeListType;
};
type CommentsLikeListType = CommentsItemType[];
type CommentsLikeItemType = {
  users_id: number;
};

type CommentsLikeListRequestType = number;
