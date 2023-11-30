import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dayjs from 'dayjs';
import ImageWrapper from 'components/common/ImageWrapper';

const Container = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  border: none;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Span = styled.span`
  width: 100%;
  display: inline-flex;
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

const formatDateTime = (date: string) =>
  dayjs(date).add(9, 'hour').format('YYYY  MM DD');

export default function Item({
  isbn,
  thumbnail,
  status,
  title,
  id,
  date,
}: MyBookListInfinityQueryItemType) {
  const navigate = useNavigate();

  const onClick = () => navigate(`/my_books/${id}`);

  return (
    <Container onClick={onClick}>
      <Header>
        <ImageWrapper src={thumbnail} alt={isbn} width={120} height={174} />
      </Header>
      <Contents>
        <Span>
          <Title>{title}</Title>
        </Span>
        <Status>{status ? status : '서재에만 담겨있어요'}</Status>
        <DateTime>📅&nbsp;{date ? formatDateTime(date) : '❌'}</DateTime>
      </Contents>
    </Container>
  );
}
