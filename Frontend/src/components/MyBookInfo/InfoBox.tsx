import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Loader from 'components/common/Loader';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import ImageWrapper from 'components/common/ImageWrapper';
import Divider from 'components/common/Divider';

const Container = styled.div`
  height: 100%;
  padding: 0 1rem;
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  margin: 0 auto;
`;

const DetailContainer = styled.div`
  height: 100%;
  width: 60%;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const ImageContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Publisher = styled.h2`
  font-size: 10px;
  color: rgba(0, 0, 0, 0.4);
`;

const Authors = styled.h3`
  font-size: 11px;
  color: rgba(0, 0, 0, 0.4);
`;

const Title = styled.h1`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Description = styled.p`
  display: block;
  font-size: 12px;
  width: 100%;
  height: 60%;
  text-overflow: ellipsis;
  overflow: scroll;
  font-weight: 400;
`;

const A = styled.a`
  font-size: 10px;
  width: auto;
  color: inherit;
  &:visited {
    color: ${({ theme }) => theme.mode.typo_main};
  }
`;

export default function InfoBox() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접급입니다.</div>;

  const { myBookInfoData, myBookInfoIsLoading } = useMyBookPageQueries(
    parseInt(users_books_id)
  );

  return (
    <Container>
      {!myBookInfoIsLoading ? (
        <>
          <ImageContainer>
            <ImageWrapper
              src={myBookInfoData?.result.image}
              alt={users_books_id}
              height={174}
              width={120}
            />
          </ImageContainer>
          <DetailContainer>
            <Publisher>{myBookInfoData?.result.publisher}</Publisher>
            <Title>{myBookInfoData?.result.title}</Title>
            <Authors>{myBookInfoData?.result.authors}</Authors>
            <Divider divider={2} />
            <Description>{myBookInfoData?.result.contents}&nbsp;</Description>
            <A
              href={myBookInfoData?.result.url}
              target="_blank"
              rel="noreferrer"
            >
              더보기...
            </A>
          </DetailContainer>
        </>
      ) : (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </Container>
  );
}
