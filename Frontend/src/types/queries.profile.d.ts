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
