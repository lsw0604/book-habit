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
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusWrapper = styled.div`
  content: '';
  margin: 0;
  padding: 0;
  height: 0;
  width: 180px;
`;

const StatusInfo = styled.div`
  position: relative;
  width: 100%;
  height: 2rem;
  bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.spinner};
  border-radius: 0 0 5px 5px;
  opacity: 0.5;
`;

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
    width: 100%;
    height: 100%;
  }
  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function Item({ isbn, image, status }: IProps) {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`/my_books/${isbn}`)}>
      <ImageWrapper>
        {image !== null ? <img src={image} alt={isbn} /> : <IconImage />}
      </ImageWrapper>
      <StatusWrapper>
        <StatusInfo>{status}</StatusInfo>
      </StatusWrapper>
    </Container>
  );
}
