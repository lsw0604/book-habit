import { IconImage } from '@style/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dateParse from 'date-fns/parseISO';
import addHours from 'date-fns/addHours';

interface IProps {
  id: number;
  title: string;
  isbn: string;
  image?: string;
  status: BookStateType;
  created_at: string;
}

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

const ImageWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  min-width: 120px;
  height: 174px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 5px;
    object-fit: fill;
    width: 100%;
    height: auto;
  }

  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
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
  created_at,
}: IProps) {
  const navigate = useNavigate();
  const [created_year, created_month, created_day] = addHours(
    dateParse(created_at),
    9
  )
    .toISOString()
    .split('T')[0]
    .split('-');
  return (
    <Container onClick={() => navigate(`/my_books/${id}`)}>
      <Header>
        <ImageWrapper>
          {image ? <img alt={isbn} src={image} /> : <IconImage />}
        </ImageWrapper>
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
