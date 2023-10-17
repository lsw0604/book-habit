import useCommentsListQuery from '@queries/comments/useCommentsListQuery';
import { IconRefresh } from '@style/icons';
import { QueryClient } from '@tanstack/react-query';
import Icon from 'components/common/Button/Icon';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  font-size: 12px;
  display: flex;
  justify-content: end;
  height: 32px;
`;

const Time = styled.p`
  margin-right: 8px;
  line-height: 32px;
  text-justify: center;
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function CommentTimer() {
  const queryClient = new QueryClient();

  const [second, setSecond] = useState<number>(59);
  const [minute, setMinute] = useState<number>(2);

  const { refetch } = useCommentsListQuery();

  const refreshHandler = () => {
    setMinute(2);
    setSecond(59);
    queryClient.invalidateQueries({
      queryKey: ['USE_COMMENTS_LIST_QUERY'],
    });
    refetch();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prev) => prev - 1);
      if (second === 0) {
        setSecond(60);
        setMinute((prev) => prev - 1);
      }

      if (minute === 0 && second === 0) {
        setMinute(2);
        setSecond(59);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [second, setSecond]);

  return (
    <Container>
      <Time>
        {minute}분{second}초 후에 새로고침 됩니다.
      </Time>
      <Icon icon={<IconRefresh />} onClick={refreshHandler}>
        refetch
      </Icon>
    </Container>
  );
}
