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
  like_user_ids: { user_id: number }[];
  reply_ids: { reply_id: number }[];
};

// useCommentsLikeMutation의 타입들

type CommentsLikeMutationResponseType = MutationResponse & { user_id: number };
type CommentsLikeMutationRequestType = number;

// useCommentsLikeDeleteMutation의 타입들

type CommentsLikeDeleteMutationResponseType = MutationResponse & {
  user_id: number;
};
type CommentsLikeDeleteMutationRequestType = number;

// useCommentsDetailQuery의 타입들

type CommentsDetailQueryResponseType = CommentsItemType;
type CommentsDetailQueryRequestType = number;

// useCommentsReplyMutation의 타입들
type CommentsReplyMutationResponseType = MutationResponse & {
  reply_id: number;
};
type CommentsReplyMutationRequestType = {
  body: { reply: string };
  comment_id: number;
};

// useCommentsReplyListQuery의 타입들
type CommentsReplyListQueryResponseType = {
  reply_list: CommentsReplyListQueryListType;
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
type CommentsReplyDeleteMutationResponseType = MutationResponse & {
  reply_id: number;
};
type CommentsReplyDeleteMutationRequestType = number;
