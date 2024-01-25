import styled from 'styled-components';
import { useState, useEffect } from 'react';

import Icon from 'components/common/Button/Icon';
import { customize } from '@style/colors';
import { IconRefresh } from '@style/icons';
import { queriesKey, queryClient } from 'queries';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  height: 32px;
`;

const Time = styled.p`
  margin-right: 8px;
  line-height: 32px;
  font-size: 10px;
  text-justify: center;
  text-align: center;
  color: ${customize.gray['400']};
`;

const { useCommentsListQueryKey } = queriesKey.comments;

export default function CommentTimer() {
  const [second, setSecond] = useState<number>(59);
  const [minute, setMinute] = useState<number>(2);

  const refreshHandler = () => {
    setMinute(2);
    setSecond(59);
    queryClient.invalidateQueries({
      queryKey: [useCommentsListQueryKey],
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prev) => prev - 1);
      if (second === 0) {
        setSecond(59);
        setMinute((prev) => prev - 1);
      }

      if (minute === 0 && second === 0) {
        refreshHandler();
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
