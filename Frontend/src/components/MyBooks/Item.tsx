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
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  gap: 8px;
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

export default function Item({
  isbn,
  image,
  status,
  title,
  id,
  date,
}: MyBookListInfinityQueryItemType) {
  const navigate = useNavigate();
  const [created_year, created_month, created_day] = dayjs(date)
    .add(9, 'hour')
    .toISOString()
    .split('T')[0]
    .split('-');

  return (
    <Container onClick={() => navigate(`/my_books/${id}`)}>
      <Header>
        <ImageWrapper src={image} alt={isbn} width={120} height={174} />
      </Header>
      <Contents>
        <Span>
          <Title>{title}</Title>
        </Span>
        <Span>
          <Status>{status}</Status>
        </Span>
      </Contents>
      <Span>
        <DateTime>
          {created_year}년 {created_month}월 {created_day}일
        </DateTime>
      </Span>
    </Container>
  );
}
