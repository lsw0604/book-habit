// useCommentsListQuery의 타입들

type CommentsListQueryResponseType = {
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
  profile: string;
};

// useCommentsLikeListQuery의 타입들

type CommentsLikeListQueryResponseType = {
  comment_likes: CommentsLikeListType;
};
type CommentsLikeListType = CommentsLikeItemType[];
type CommentsLikeItemType = {
  users_id: number;
};

type CommentsLikeListRequestType = number;

// useCommentsLikeMutation의 타입들

type CommentsLikeMutationResponseType = MutationResponse;
type CommentsLikeMutationRequestType = number;

// useCommentsLikeDeleteMutation의 타입들

type CommentsLikeDeleteMutationResponseType = MutationResponse;
type CommentsLikeDeleteMutationRequestType = number;

// useCommentsDetailQuery의 타입들

type CommentsDetailQueryResponseType = CommentsItemType;
type CommentsDetailQueryRequestType = number;
