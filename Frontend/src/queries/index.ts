import { QueryClient } from '@tanstack/react-query';

export const queriesKey = {
  book: {
    useBookSearchInfinityQueryKey: 'USE_BOOK_SEARCH_INFINITY_QUERY_KEY',
    useReadBookMutationKey: 'USE_BOOK_SEARCH_READ_BOOK_MUTATION_KEY',
    useReadingBookMutationKey: 'USE_BOOK_SEARCH_READING_BOOK_MUTATION_KEY',
    useReadToBookMutationKey: 'USE_BOOK_SEARCH_READ_TO_BOOK_MUTATION_KEY',
  },
  comments: {
    useCommentsDetailQueryKey: 'USE_COMMENTS_DETAIL_QUERY_KEY',
    useCommentsLikeDeleteMutationKey: 'USE_COMMENTS_LIKE_DELETE_MUTATION_KEY',
    useCommentsLikeListQueryKey: 'USE_COMMENTS_LIKE_LIST_QUERY_KEY',
    useCommentsLikeRegisterMutationKey:
      'USE_COMMENTS_LIKE_REGISTER_MUTATION_KEY',
    useCommentsListQueryKey: 'USE_COMMENTS_LIST_QUERY_KEY',
    useCommentsReplyDeleteMutationKey: 'USE_COMMENTS_REPLY_DELETE_MUTATION_KEY',
    useCommentsReplyListQueryKey: 'USE_COMMENTS_REPLY_LIST_QUERY_KEY',
    useCommentsReplyRegisterMutationKey:
      'USE_COMMENTS_REPLY_REGISTER_MUTATION_KEY',
  },
  kakao: {
    useKakaoCallbackQueryKey: 'USE_KAKAO_CALLBACK_QUERY_KEY',
    useKakaoRegisterMutationKey: 'USE_KAKAO_REGISTER_MUTATION_KEY',
  },
  local: {
    useLocalLoginMutationKey: 'USE_LOCAL_LOGIN_MUTATION_KEY',
    useLocalRegisterMutationKey: 'USE_LOCAL_REGISTER_MUTATION_KEY',
  },
  myBook: {
    useMyBookCommentDeleteMutationKey:
      'USE_MY_BOOK_COMMENT_DELETE_MUTATION_KEY',
    useMyBookCommentRegisterMutationKey:
      'USE_MY_BOOK_COMMENT_REGISTER_MUTATION_KEY',
    useMyBookCommentUpdateMutationKey:
      'USE_MY_BOOK_COMMENT_UPDATE_MUTATION_KEY',
    useMyBookCommentListQueryKey: 'USE_MY_BOOK_COMMENT_LIST_QUERY_KEY',
    useMyBookHistoryDeleteMutationKey:
      'USE_MY_BOOK_HISTORY_DELETE_MUTATION_KEY',
    useMyBookHistoryRegisterMutationKey:
      'USE_MY_BOOK_HISTORY_REGISTER_MUTATION_KEY',
    useMyBookListDeleteMutationKey: 'USE_MY_BOOK_LIST_DELETE_MUTATION_KEY',
    useMyBookListInfinityQueryKey: 'USE_MY_BOOK_LIST_INFINITY_QUERY_KEY',
    useMyBookPageQueriesKey: {
      info: 'USE_MY_BOOK_PAGE_INFO_QUERIES_KEY',
      history: 'USE_MY_BOOK_PAGE_HISTORY_QUERIES_KEY',
      time: 'USE_MY_BOOK_PAGE_TIME_QUERIES_KEY',
    },
  },
  profile: {
    useProfileEditMutationKey: 'USE_PROFILE_EDIT_MUTATION_KEY',
    useProfileInfoEditMutationKey: 'USE_PROFILE_INFO_EDIT_MUTATION_KEY',
    useProfileLikeQueryKey: 'USE_PROFILE_LIKE_QUERY_KEY',
    useProfileReplyQueryKey: 'USE_PROFILE_REPLY_QUERY_KEY',
  },
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      cacheTime: 900000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
});
