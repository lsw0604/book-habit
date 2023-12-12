import styled from 'styled-components';
import Button from 'components/common/Button';
import { useEffect } from 'react';
import useMyBookHistoryDeleteMutation from '@queries/myBook/useMyBookHistoryDeleteMutation';
import useMyBookHook from '@hooks/useMyBookHook';
import { IconTrashCan, LogoSad } from '@style/icons';
import { useSetRecoilState } from 'recoil';
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

export default function HistoryDelete() {
  const setModalState = useSetRecoilState(modalAtom);

  const { myBookHistoryId, myBookUsersBooksId, onChangeMyBookStateInitial } =
    useMyBookHook();
  const { mutate, isLoading, isSuccess } = useMyBookHistoryDeleteMutation(
    myBookHistoryId as number,
    myBookUsersBooksId as number
  );

  const deleteHandler = () => {
    mutate(myBookHistoryId as number);
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
        <Stack>독서기록을 삭제 하시겠어요?</Stack>
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
