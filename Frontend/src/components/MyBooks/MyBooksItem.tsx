import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';

import ImageWrapper from 'components/common/ImageWrapper';

interface IProps {
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
  margin-bottom: 8px;
`;

const Contents = styled.div`
  width: 100%;
  height: auto;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const Title = styled.p`
  font-size: 20px;
  line-height: 22px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Status = styled.p`
  color: ${({ theme }) => theme.colors.main};
  font-size: 12px;
`;

const DateTime = styled.p`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 12px;
`;

export default function MyBooksItem({ item }: IProps) {
  const navigate = useNavigate();

  const { date, id, isbn, thumbnail, title } = item;

  const datetime = dayjs(date).add(9, 'hour').format('YYYY MM DD');

  const onClick = () => navigate(`/my_books/${id}`);

  return (
    <Container onClick={onClick}>
      <Header>
        <ImageWrapper src={thumbnail} alt={isbn} width={120} height={174} />
      </Header>
      <Contents>
        <Title>{title}</Title>
        <Status>{status ? status : '서재에만 담겨있어요'}</Status>
        <DateTime>📅&nbsp;{date ? datetime : '❌'}</DateTime>
      </Contents>
    </Container>
  );
}
