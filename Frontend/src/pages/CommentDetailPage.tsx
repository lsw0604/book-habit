import styled from 'styled-components';
import { useParams } from 'react-router-dom';

import Loader from 'components/common/Loader';
import CommentHeart from 'components/Comments/CommentHeart';
import CommentHeaderInfo from 'components/Comments/CommentHeaderInfo';
import useCommentsDetailQuery from '@queries/comments/useCommentsDetailQuery';
import CommentReply from 'components/Comments/CommentReply';
import CommentReplyList from 'components/Comments/CommentReplyList';
import CommentReplyForm from 'components/Comments/CommentReplyForm';
import HelmetProvider from 'components/common/HelmetProvider';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 1rem;
  @media screen and (min-width: 1280px) {
    padding: 1rem 30%;
  }
`;

const DetailContainer = styled.div`
  gap: 1rem;
  width: 100%;
  height: auto;
  padding: 1rem;
  display: flex;
  position: relative;
  border-radius: 1rem;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  margin-bottom: 1rem;
`;

const Header = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Comment = styled.div`
  width: 100%;
  height: auto;
  min-height: 100px;
  line-height: 25px;
  white-space: pre-line;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const Bottom = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: start;
  gap: 1rem;
  svg {
    width: 1rem;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReplyContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.md};
  border-radius: 1rem;
`;

const Wrapper = styled.div`
  height: 80%;
  position: relative;
  width: 100%;
  overflow: scroll;
  margin-bottom: 1rem;
`;

export default function CommentDetailPage() {
  const { comment_id } = useParams();

  if (!comment_id) return <Container>잘못된 접근입니다.</Container>;

  const { data, isLoading } = useCommentsDetailQuery(parseInt(comment_id));

  if (isLoading || !data)
    return (
      <LoadingWrapper>
        <Loader size={2} />
      </LoadingWrapper>
    );

  const HELMET_PROVIDER_OPTIONS = {
    title: `${data.title}`,
    description: `${data.name}님이 ${data.title}을 읽고 남긴 한줄 평을 보여주는 페이지 입니다.`,
    keywords: [data.title],
  };

  return (
    <>
      <HelmetProvider {...HELMET_PROVIDER_OPTIONS} />
      <Container>
        <DetailContainer>
          <Header>
            <CommentHeaderInfo
              name={data.name}
              title={data.title}
              profile={data.profile}
              created_at={data.created_at}
              rating={data.rating}
              status={data.status}
            />
          </Header>
          <Comment>{data.comment}</Comment>
          <Bottom>
            <CommentHeart comment_id={parseInt(comment_id)} />
            <CommentReply comment_id={parseInt(comment_id)} />
          </Bottom>
        </DetailContainer>
        <ReplyContainer>
          <Wrapper>
            <CommentReplyList />
          </Wrapper>
          <CommentReplyForm />
        </ReplyContainer>
      </Container>
    </>
  );
}
