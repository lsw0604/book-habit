import { IconImage } from '@style/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  isbn: string;
  image: string | null;
  status: BookStateType;
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusWrapper = styled.div``;

const ImageWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  min-height: 240px;
  min-width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    border-radius: 5px;
    object-fit: fill;
    width: 180px;
    height: 240px;
  }
  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function MyBooksItem({ isbn, image, status }: IProps) {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`/my_books/${isbn}`)}>
      <ImageWrapper>
        {image !== null ? <img src={image} alt={isbn} /> : <IconImage />}
      </ImageWrapper>
      <StatusWrapper>{status}</StatusWrapper>
    </Container>
  );
}
