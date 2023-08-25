import { IconImage } from '@style/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface IProps {
  id: number;
  title: string;
  isbn: string;
  image?: string;
  status: BookStateType;
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  border: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusWrapper = styled.div`
  content: '';
  margin: 0;
  padding: 0;
  height: 0;
  width: 100%;
`;

const StatusInfo = styled.span`
  position: relative;
  width: 100%;
  height: 2rem;
  bottom: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.spinner};
  color: ${({ theme }) => theme.mode.sub};
  border-radius: 0 0 5px 5px;
`;

const TitleInfo = styled.span`
  color: ${({ theme }) => theme.mode.sub};
  position: relative;
  width: 100%;
  height: auto;
  min-height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.spinner};
  border-radius: 5px 5px 0 0;
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  margin: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    border-radius: 5px;
    object-fit: fill;
    width: 100%;
    height: 100%;
    display: block;
  }
  svg {
    width: 2rem;
    height: 2rem;
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

export default function Item({ isbn, image, status, title, id }: IProps) {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate(`/my_books/${title}/${id}`)}>
      <StatusWrapper>
        <TitleInfo>{title}</TitleInfo>
      </StatusWrapper>
      <ImageWrapper>
        {image !== '' ? (
          <img src={image} alt={isbn} />
        ) : (
          <IconWrapper>
            <IconImage />
          </IconWrapper>
        )}
      </ImageWrapper>
      <StatusWrapper>
        <StatusInfo>{status}</StatusInfo>
      </StatusWrapper>
    </Container>
  );
}
