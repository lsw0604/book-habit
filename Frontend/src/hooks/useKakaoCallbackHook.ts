import { useQuery, useQueryClient } from '@tanstack/react-query';

import { kakaoCallbackAPI } from 'lib/api/auth';

const REACT_QUERY_KEY = 'USE_KAKAO_CALLBACK_HOOK';

export default function useKakaoCallbackHook(code: string) {
  const queryClient = useQueryClient();

  const { isLoading, data, isSuccess, isError, error } = useQuery(
    [REACT_QUERY_KEY],
    () => kakaoCallbackAPI(code)
  );

  if (isError && error) {
    queryClient.refetchQueries([REACT_QUERY_KEY]);
    console.log(error);
  }

  return {
    isSuccess,
    isError,
    error,
    isLoading,
    data,
  };
}
