import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Loader from 'components/common/Loader';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import ImageWrapper from 'components/common/ImageWrapper';
import Divider from 'components/common/Divider';
import Icon from 'components/common/Button/Icon';
import { IconBookMark, IconTrashCan } from '@style/icons';
import { customize } from '@style/colors';
import useMyBookListDeleteMutation from '@queries/myBook/useMyBookListDeleteMutation';

const Container = styled.div`
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
  border-radius: 1rem;
  display: flex;
  padding: 1rem 0;
  margin: 0 auto;
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 57%;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const ImageContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  min-height: 190px;
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
  font-size: 12px;
  width: 100%;
  font-weight: 700;
`;

const A = styled.a`
  font-size: 10px;
  width: auto;
  color: inherit;
  &:visited {
    color: ${({ theme }) => theme.mode.typo_main};
  }
`;

const DetailHeader = styled.div`
  display: flex;
`;

const DetailHeaderInfo = styled.div`
  width: 80%;
`;

const DetailHeaderIconWrapper = styled.div`
  width: 20%;
`;

const BookMarkWrapper = styled.div`
  width: 120px;
  height: 174px;
  position: absolute;
  svg {
    position: absolute;
    right: 10px;
    height: 1.5rem;
    fill: ${customize.yellow['300']};
  }
`;

export default function InfoBox() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접급입니다.</div>;

  const { mutate, isLoading } = useMyBookListDeleteMutation(
    parseInt(users_books_id)
  );
  const { myBookInfoData, myBookInfoIsLoading } = useMyBookPageQueries(
    parseInt(users_books_id)
  );

  const deleteHandler = () => {
    mutate(parseInt(users_books_id));
  };

  return (
    <Container>
      {!myBookInfoIsLoading ? (
        <>
          <ImageContainer>
            <ImageWrapper
              src={myBookInfoData?.result.thumbnail}
              alt={users_books_id}
              height={174}
              width={120}
            />
            <BookMarkWrapper>
              <IconBookMark />
            </BookMarkWrapper>
          </ImageContainer>
          <DetailContainer>
            <DetailHeader>
              <DetailHeaderInfo>
                <Publisher>{myBookInfoData?.result.publisher}</Publisher>
                <Title>{myBookInfoData?.result.title}</Title>
                <Authors>{myBookInfoData?.result.authors}</Authors>
              </DetailHeaderInfo>
              <DetailHeaderIconWrapper>
                <Icon
                  onClick={deleteHandler}
                  icon={<IconTrashCan />}
                  isLoading={isLoading}
                >
                  Delete
                </Icon>
              </DetailHeaderIconWrapper>
            </DetailHeader>
            <Divider divider={2} />
            <Description>
              {myBookInfoData?.result.contents}&nbsp;...
            </Description>
            <A
              href={myBookInfoData?.result.url}
              target="_blank"
              rel="noreferrer"
            >
              더보기
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
