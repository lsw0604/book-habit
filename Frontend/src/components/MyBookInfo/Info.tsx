import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Loader from 'components/common/Loader';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import ImageWrapper from 'components/common/ImageWrapper';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 120px calc(100% - 128px);
  gap: 8px;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10rem;
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

  const { myBookInfoData, myBookInfoIsLoading } = useMyBookPageQueries(
    parseInt(users_books_id)
  );

  return (
    <Container>
      <ImageWrapper
        src={myBookInfoData?.result.image}
        alt={users_books_id}
        height={174}
        width={120}
      />
      <DetailContainer>
        {!myBookInfoIsLoading ? (
          <>
            <Title>제목 : {myBookInfoData?.result.title}</Title>
            <Description>{myBookInfoData?.result.contents}&nbsp;</Description>
            <A
              href={myBookInfoData?.result.url}
              target="_blank"
              rel="noreferrer"
            >
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
