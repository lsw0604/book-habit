import { useEffect } from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Button from 'components/common/Button';
import ModalHeader from 'components/Modals/ModalHeader';
import ModalDeleteBody from 'components/Modals/ModalLogoBody';

import { modalAtom } from 'recoil/modal';
import { IconTrashCan, LogoSad } from '@style/icons';
import useMyBookHook from '@hooks/useMyBookHook';
import useMyBookCommentDeleteMutation from '@queries/myBook/useMyBookCommentDeleteMutation';

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
  title: '등록된 한줄평을 삭제하시겠어요?',
  sub: '한번 삭제되면 복구 할 수 없습니다.',
  icon: <IconTrashCan />,
};

const BODY_OPTION = {
  icon: <LogoSad />,
  message: '삭제하시겠어요?',
};

export default function CommentDelete() {
  const setModalState = useSetRecoilState(modalAtom);

  const { myBookCommentId, myBookUsersBooksId, onChangeMyBookStateInitial } =
    useMyBookHook();

  const { mutate, isLoading, isSuccess } = useMyBookCommentDeleteMutation(
    myBookUsersBooksId as number,
    myBookCommentId as number
  );

  const deleteHandler = () => {
    mutate(myBookCommentId as number);
  };

  const initHandler = () => {
    setModalState({ isOpen: false, type: undefined });
    onChangeMyBookStateInitial();
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
