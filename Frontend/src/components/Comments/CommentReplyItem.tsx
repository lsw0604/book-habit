import useCommentsReplyDeleteMutation from '@queries/comments/useCommentsReplyDeleteMutaion';
import { IconTrashCan } from '@style/icons';
import Avatar from 'components/common/Avatar';
import Icon from 'components/common/Button/Icon';
import dayjs from 'dayjs';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'recoil/user';
import styled from 'styled-components';

const Container = styled.li`
  width: 100%;
  position: relative;
  display: flex;
  padding: 8px;
  flex-direction: column;
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

export default function CommentReplyItem({
  created_at,
  name,
  profile,
  reply,
  reply_id,
  users_id,
}: CommentsReplyListQueryItemType) {
  const { pathname } = useLocation();
  const comment_id = pathname.split('/')[2];

  const { mutate, isLoading } = useCommentsReplyDeleteMutation(
    reply_id,
    parseInt(comment_id)
  );

  const createdTime = dayjs(created_at).format('YYYY/MM/DD');
  const { id } = useRecoilValue(userAtom);
  const isAuth = users_id === id ? true : false;

  const replyDeleteHandler = () => {
    mutate(reply_id);
  };

  return (
    <Container>
      <ReplyHeaderContainer>
        <ReplyIconContainer>
          <Avatar size="40px" src={profile} key={reply_id} />
          <ReplyHeaderInfoContainer>
            <ReplyHeaderNameWrapper>{name}</ReplyHeaderNameWrapper>
            <ReplyHeaderDateWrapper>{createdTime}</ReplyHeaderDateWrapper>
          </ReplyHeaderInfoContainer>
        </ReplyIconContainer>
        {isAuth ? (
          <Icon
            onClick={replyDeleteHandler}
            isLoading={isLoading}
            icon={<IconTrashCan />}
          >
            Delete
          </Icon>
        ) : null}
      </ReplyHeaderContainer>
      <ReplyWrapper>{reply}</ReplyWrapper>
    </Container>
  );
}
