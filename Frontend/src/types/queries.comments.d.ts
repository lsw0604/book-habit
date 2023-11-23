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
  status: '읽는중' | '읽기전' | '다읽음';
  age_category:
    | '어린이'
    | '10대'
    | '20대'
    | '30대'
    | '40대'
    | '50대'
    | '60대 이상';
  gender: GenderType;
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

// useCommentsReplyMutation의 타입들
type CommentsReplyMutationResponseType = MutationResponse;
type CommentsReplyMutationRequestType = {
  body: { reply: string };
  comment_id: number;
};

// useCommentsReplyListQuery의 타입들
type CommentsReplyListQueryResponseType = {
  reply: CommentsReplyListQueryListType;
};
type CommentsReplyListQueryListType = CommentsReplyListQueryItemType[];
type CommentsReplyListQueryItemType = {
  reply_id: number;
  reply: string;
  created_at: Date;
  users_id: number;
  name: string;
  profile: string;
};
type CommentsReplyListQueryRequestType = number;

// useCommentsReplyDeleteMutation의 타입들
type CommentsReplyDeleteMutationResponseType = MutationResponse;
type CommentsReplyDeleteMutationRequestType = number;
