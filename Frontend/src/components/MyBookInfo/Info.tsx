import useMyBookInfoHook from '@hooks/useMyBookInfoHook';
import { IconImage } from '@style/icons';
import Loader from 'components/common/Loader';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 120px calc(100% - 128px);
  gap: 8px;
  margin-bottom: 1rem;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
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

const DetailContainer = styled.div`
  display: block;
  flex-direction: column;
  gap: 1rem;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const Title = styled.div`
  padding: 0 1rem;
  width: 100%;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-bottom: 8px;
`;

const Description = styled.span`
  display: block;
  font-size: 13px;
`;

const A = styled.a`
  font-size: 10px;
  width: auto;
  color: inherit;
  &:visited {
    color: ${({ theme }) => theme.mode.typo_main};
  }
`;

export default function Info() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접급입니다.</div>;

  const { data, isLoading } = useMyBookInfoHook(parseInt(users_books_id));

  return (
    <Container>
      <ImageWrapper>
        {!isLoading ? (
          data?.result.image ? (
            <img src={data?.result.image} alt={data?.result.title} />
          ) : (
            <IconImage />
          )
        ) : (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
      </ImageWrapper>
      <DetailContainer>
        {!isLoading ? (
          <>
            <Title>제목 : {data?.result.title}</Title>
            <Description>{data?.result.contents}&nbsp;</Description>
            <A href={data?.result.url} target="_blank" rel="noreferrer">
              더보기...
            </A>
          </>
        ) : (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
      </DetailContainer>
    </Container>
  );
}
