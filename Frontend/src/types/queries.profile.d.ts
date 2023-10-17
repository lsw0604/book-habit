// useProfileEditMutation의 타입들

type ProfileEditMutationResponseType = MutationResponse & {
  profile: string;
};
type ProfileEditMutationRequestType = FormData;

// useProfileInfoQuery의 타입들

type ProfileInfoQueryResponseType = {
  comments_count: number;
  books_count: number;
  likes_count: number;
};

// useProfileLikeInfinityQuery의 타입들

type ProfileLikeInfinityQueryResponseType = {
  nextPage?: number;
  prevPage?: number;
  like_list: ProfileLikeInfinityQueryListType;
};
type ProfileLikeInfinityQueryListType = ProfileLikeInfinityQueryItemType[];
type ProfileLikeInfinityQueryItemType = {
  like_id: number;
  status: '다읽음' | '읽는중' | '읽기전';
  comment_id: number;
  title: string;
  profile: string;
  name: string;
};
