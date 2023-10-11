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
  thumbnail,
  status,
  title,
  id,
  date,
}: MyBookListInfinityQueryItemType) {
  const navigate = useNavigate();

  if (date && status) {
    const [year, month, day] = dayjs(date)
      .add(9, 'hour')
      .toISOString()
      .split('T')[0]
      .split('-');
    return (
      <Container onClick={() => navigate(`/my_books/${id}`)}>
        <Header>
          <ImageWrapper src={thumbnail} alt={isbn} width={120} height={174} />
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
            {year} / {month} / {day}
          </DateTime>
        </Span>
      </Container>
    );
  }

  return (
    <Container onClick={() => navigate(`/my_books/${id}`)}>
      <Header>
        <ImageWrapper src={thumbnail} alt={isbn} width={120} height={174} />
      </Header>
      <Contents>
        <Span>
          <Title>{title}</Title>
        </Span>
        <Span>
          <Status>서재에만 담아두고 </Status>
        </Span>
      </Contents>
      <Span>
        <DateTime>기록이 없는 상태 입니다.</DateTime>
      </Span>
    </Container>
  );
}
