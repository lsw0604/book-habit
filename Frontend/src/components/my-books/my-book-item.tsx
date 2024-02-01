import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

import ImageWrapper from 'components/common/image-wrapper';
import Skeleton from 'components/common/Skeleton';

interface MyBookItemProps {
  item: MyBookListInfinityQueryItemType;
}

const Container = styled.li`
  width: 100%;
  height: auto;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
`;

const Contents = styled.div`
  width: 100%;
  height: auto;
`;

const Title = styled.p`
  font-size: 1.125rem;
  line-height: 1.75rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Status = styled.p`
  color: ${({ theme }) => theme.colors.main};
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const DateTime = styled.p`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export default function MyBookItem({ item }: MyBookItemProps) {
  const navigate = useNavigate();

  const { date, id, isbn, thumbnail, title, status } = item;

  const datetime = dayjs(date).add(9, 'hour').format('YYYY MM DD');

  const onClick = () => navigate(`/my_books/detail/${id}`);

  return (
    <Container onClick={onClick}>
      <Header>
        <ImageWrapper src={thumbnail} alt={isbn} width={120} height={174} />
      </Header>
      <Contents>
        <Title>{title}</Title>
        <DateTime>📅&nbsp;{date ? datetime : '❌'}</DateTime>
        <Status>{status ? status : '상태없음'}</Status>
      </Contents>
    </Container>
  );
}

MyBookItem.Loader = function MyBookItemLoader() {
  return (
    <Container>
      <Header>
        <Skeleton width="120px" height="174px" />
      </Header>
      <Contents>
        <Skeleton
          width="100%"
          height="26px"
          style={{ marginBottom: '0.25rem' }}
        />
        <Skeleton
          width="50px"
          height="18px"
          style={{ marginBottom: '0.25rem' }}
        />
        <Skeleton
          width="100px"
          height="18px"
          style={{ marginBottom: '0.25rem' }}
        />
      </Contents>
    </Container>
  );
};
