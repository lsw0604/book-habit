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
    useKakaoCallbackQueryKey: '',
    useKakaoRegisterMutationKey: '',
  },
  local: {
    useLocalLoginMutationKey: '',
    useLocalRegisterMutationKey: '',
  },
  myBook: {
    useMyBookCommentDeleteMutationKey: '',
    useMyBookCommentRegisterMutationKey: '',
    useMyBookCommentUpdateMutationKey: '',
    useMyBookCommentListQueryKey: '',
    useMyBookHistoryDeleteMutationKey: '',
    useMyBookHistoryRegisterMutationKey: '',
    useMyBookListDeleteMutationKey: '',
    useMyBookListInfinityQueryKey: '',
    useMyBookPageQueriesKey: {
      info: 'USE_MY_BOOK_PAGE_INFO_QUERIES_KEY',
      history: 'USE_MY_BOOK_PAGE_HISTORY_QUERIES_KEY',
      time: 'USE_MY_BOOK_PAGE_TIME_QUERIES_KEY',
    },
  },
  profile: {
    useProfileEditMutationKey: '',
    useProfileInfoEditMutationKey: '',
    useProfileLikeQueryKey: '',
    useProfileReplyQueryKey: '',
  },
};
