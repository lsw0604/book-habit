import { useEffect } from 'react';
import styled from 'styled-components';
import Button from 'components/common/Button';
import { useRecoilState, useSetRecoilState } from 'recoil';

import ModalHeader from 'components/Modals/ModalHeader';
import ModalDeleteBody from 'components/Modals/ModalLogoBody';

import { replyAtom } from 'recoil/reply';
import { modalAtom } from 'recoil/modal';
import { IconTrashCan, LogoSad } from '@style/icons';
import useCommentsReplyDeleteMutation from '@queries/comments/useCommentsReplyDeleteMutation';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 24px;
  line-height: 22px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const HEADER_OPTION = {
  title: '댓글을 삭제하시겠어요?',
  sub: '한번 삭제하면 복구 할 수 없습니다.',
  icon: <IconTrashCan />,
};

const BODY_OPTION = {
  icon: <LogoSad />,
  message: '삭제하시겠어요?',
};

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
      <ModalHeader {...HEADER_OPTION} />
      <ModalDeleteBody {...BODY_OPTION} />
      <Footer>
        <Button onClick={deleteHandler} isLoading={isLoading}>
          삭제할게요.
        </Button>
        <Button onClick={initHandler} text>
          아니요
        </Button>
      </Footer>
    </Container>
  );
}
