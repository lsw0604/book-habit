import dayjs from 'dayjs';
import styled from 'styled-components';

import { IconCalendar } from '@style/icons';
import Avatar from 'components/common/Avatar';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import { replyAtom } from 'recoil/reply';
import { userAtom } from 'recoil/user';
import Skeleton from 'components/common/skeleton';
import { customize } from '@style/colors';

const Container = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
`;

const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const HeaderInfoNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  p {
    position: relative;
    font-size: 0.875rem;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const HeaderInfoDatetimeContainer = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
  display: flex;
  align-items: center;
  color: ${customize.slate['400']};
  svg {
    fill: ${customize.slate['400']};
  }
`;

const ReplyHeaderInfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ReplyWrapper = styled.p`
  width: 100%;
  min-height: 2.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  height: auto;
  display: flex;
  align-items: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 1rem;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const ReplyDeleteWrapper = styled.p`
  display: flex;
  justify-content: flex-end;
  font-size: 0.75rem;
  line-height: 1rem;
  gap: 2rem;
`;

export default function CommentDetailReplyItem({
  created_at,
  name,
  profile,
  reply,
  reply_id,
  users_id,
  comment_id,
}: CommentsReplyListQueryItemType & { comment_id: number }) {
  const setReplyState = useSetRecoilState(replyAtom);
  const setModalState = useSetRecoilState(modalAtom);
  const { id } = useRecoilValue(userAtom);

  const createdTime = dayjs(created_at).format('YYYY/MM/DD HH:mm:ss');
  const isAuth = users_id === id ? true : false;

  const replyDeleteHandler = () => {
    setReplyState({ comment_id, reply_id });
    setModalState({ isOpen: true, type: 'deleteReply' });
  };

  return (
    <Container>
      <HeaderContainer>
        <Avatar size="40px" src={profile} key={reply_id} />
        <HeaderInfoContainer>
          <ReplyHeaderInfoContainer>
            <HeaderInfoNameWrapper>
              <p>{name}</p>
            </HeaderInfoNameWrapper>
            <HeaderInfoDatetimeContainer>
              <IconCalendar />
              &nbsp;
              {createdTime}
            </HeaderInfoDatetimeContainer>
          </ReplyHeaderInfoContainer>
        </HeaderInfoContainer>
      </HeaderContainer>
      <ReplyWrapper>{reply}</ReplyWrapper>
      {isAuth && (
        <ReplyDeleteWrapper>
          <span onClick={replyDeleteHandler}>삭제하기</span>
          <span>수정하기</span>
        </ReplyDeleteWrapper>
      )}
    </Container>
  );
}

const CommentDetailReplyItemLoaderContainer = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.5rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
`;

const CommentDetailReplyItemLoaderHeader = styled.div`
  position: relative;
  display: flex;
  gap: 1rem;
`;

const CommentDetailReplyItemLoaderHeaderDescription = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
  gap: 0.5rem;
`;

const CommentDetailReplyItemLoaderHeaderUser = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

CommentDetailReplyItem.Loader = function CommentDetailReplyItemLoader() {
  return (
    <CommentDetailReplyItemLoaderContainer>
      <CommentDetailReplyItemLoaderHeader>
        <Skeleton width="2.5rem" height="2.5rem" isCircle />
        <CommentDetailReplyItemLoaderHeaderDescription>
          <CommentDetailReplyItemLoaderHeaderUser>
            <Skeleton width="100px" height="20px" />
          </CommentDetailReplyItemLoaderHeaderUser>
          <Skeleton width="120px" height="12px" />
        </CommentDetailReplyItemLoaderHeaderDescription>
      </CommentDetailReplyItemLoaderHeader>
      <Skeleton width="100%" height="2.5rem" />
    </CommentDetailReplyItemLoaderContainer>
  );
};
