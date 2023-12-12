import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react';

import Button from 'components/common/Button';
import useMyBookHook from '@hooks/useMyBookHook';
import { IconTrashCan, LogoSad } from '@style/icons';
import { modalAtom } from 'recoil/modal';
import useMyBookCommentDeleteMutation from '@queries/myBook/useMyBookCommentDeleteMutation';

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
      <Header>
        <Stack>
          <LogoSad />
        </Stack>
        <Stack>한줄평 삭제 하시겠어요?</Stack>
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
