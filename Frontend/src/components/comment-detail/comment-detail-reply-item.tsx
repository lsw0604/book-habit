import dayjs from 'dayjs';
import styled from 'styled-components';

import { IconCalendar, IconTrashCan } from '@style/icons';
import Avatar from 'components/common/Avatar';
import Icon from 'components/common/Button/Icon';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalAtom } from 'recoil/modal';
import { replyAtom } from 'recoil/reply';
import { userAtom } from 'recoil/user';
import Skeleton from 'components/common/skeleton';

const Container = styled.li`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.mode.sub};
  margin-bottom: 1rem;
  gap: 8px;
`;

const ReplyHeaderContainer = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: space-between;
`;

const ReplyHeaderDateWrapper = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  svg {
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const ReplyHeaderInfoContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ReplyIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const ReplyHeaderNameWrapper = styled.span`
  font-size: 18px;
  line-height: 22px;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const ReplyWrapper = styled.div`
  width: 100%;
  min-height: 55px;
  height: auto;
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.main};
  padding: 0 1rem;
  border-radius: 5px;
  color: ${({ theme }) => theme.mode.typo_sub};
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
      <ReplyHeaderContainer>
        <ReplyIconContainer>
          <Avatar size="40px" src={profile} key={reply_id} />
          <ReplyHeaderInfoContainer>
            <ReplyHeaderNameWrapper>{name}</ReplyHeaderNameWrapper>
            <ReplyHeaderDateWrapper>
              <IconCalendar />
              &nbsp;
              {createdTime}
            </ReplyHeaderDateWrapper>
          </ReplyHeaderInfoContainer>
        </ReplyIconContainer>
        {isAuth ? (
          <Icon onClick={replyDeleteHandler} icon={<IconTrashCan />}>
            Delete
          </Icon>
        ) : null}
      </ReplyHeaderContainer>
      <ReplyWrapper>{reply}</ReplyWrapper>
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
