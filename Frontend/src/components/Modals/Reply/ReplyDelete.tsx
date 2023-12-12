import styled from 'styled-components';
import Button from 'components/common/Button';
import { useEffect } from 'react';
import { IconTrashCan, LogoSad } from '@style/icons';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { replyAtom } from 'recoil/reply';
import useCommentsReplyDeleteMutation from '@queries/comments/useCommentsReplyDeleteMutation';
import { modalAtom } from 'recoil/modal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 24px;
  line-height: 22px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0 10px;
  svg {
    width: 100%;
  }
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ReplyDelete() {
  const [replyState, setReplyState] = useRecoilState(replyAtom);
  const setModalState = useSetRecoilState(modalAtom);

  const reply_id = replyState.reply_id;
  const comment_id = replyState.comment_id;

  const { mutate, isLoading, isSuccess } = useCommentsReplyDeleteMutation(
    reply_id,
    comment_id
  );

  const deleteHandler = () => {
    mutate(reply_id);
  };

  const initHandler = () => {
    setReplyState({
      comment_id: 0,
      reply_id: 0,
    });
    setModalState({ isOpen: false, type: undefined });
  };

  useEffect(() => {
    if (isSuccess) {
      initHandler();
    }
  }, [isSuccess]);

  return (
    <Container>
      <Header>
        <Stack>
          <LogoSad />
        </Stack>
        <Stack>댓글을 삭제 하시겠어요?</Stack>
      </Header>
      <Footer>
        <Button
          onClick={deleteHandler}
          isLoading={isLoading}
          icon={<IconTrashCan />}
        >
          네
        </Button>
        <Button onClick={initHandler} text>
          아니요
        </Button>
      </Footer>
    </Container>
  );
}
