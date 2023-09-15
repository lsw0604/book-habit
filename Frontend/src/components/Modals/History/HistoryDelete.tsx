import styled from 'styled-components';
import Button from 'components/common/Button';
import { useEffect } from 'react';
import useMyBookHistoryDeleteMutation from '@queries/myBook/useMyBookHistoryDeleteMutation';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import { IconTrashCan, Sad } from '@style/icons';
import useModalHook from '@hooks/useModalHook';

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
  flex-direction: column;
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
  const { addFormHistoryId, addFormUsersBooksId, onChangeAddFormStateInitial } =
    useMyBookAddFormHook();
  const { setModalState } = useModalHook();
  const { mutate, isLoading, isSuccess } = useMyBookHistoryDeleteMutation(
    addFormHistoryId as number,
    addFormUsersBooksId as number
  );

  const deleteHandler = () => {
    mutate(addFormHistoryId as number);
  };

  useEffect(() => {
    if (isSuccess) {
      setModalState({ isOpen: false, type: undefined });
      onChangeAddFormStateInitial();
    }
  }, [isSuccess]);

  return (
    <Container>
      <Header>
        <Stack>
          <Sad />
        </Stack>
        <Stack>소중한 독서기록 삭제 하시겠어요?</Stack>
      </Header>
      <Footer>
        <Button
          onClick={deleteHandler}
          isLoading={isLoading}
          icon={<IconTrashCan />}
        >
          네, 삭제해주세요
        </Button>
      </Footer>
    </Container>
  );
}