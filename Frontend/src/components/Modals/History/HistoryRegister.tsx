import { ChangeEvent } from 'react';
import styled from 'styled-components';
import { customize } from '@style/colors';
import HistoryForm from 'components/MyBookInfo/AddForm/History';
import { IconCalendar } from '@style/icons';
import Button from 'components/common/Button';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';
import useMyBookHistoryMutation from '@queries/myBook/useMyBookHistoryMutation';

const Container = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const HeaderIconWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  svg {
    height: 50%;
    fill: ${({ theme }) => theme.mode.typo_main};
  }
`;

const HeaderDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderDescriptionMain = styled.span`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 20px;
`;

const HeaderDescriptionSub = styled.span`
  font-size: 12px;
  color: ${customize.gray['400']};
`;

const Content = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const Footer = styled.div`
  position: relative;
`;

export default function HistoryRegister() {
  const {
    useMyBookAddFormHistoryValidation,
    onChangeAddFormUseValidation,
    addFormUsersBooksId,
    addFormDate,
    addFormStatus,
  } = useMyBookAddFormHook();

  const { mutate, isLoading } = useMyBookHistoryMutation(
    addFormUsersBooksId as number
  );

  const body: MyBookHistoryMutationRequestType = {
    users_books_id: addFormUsersBooksId as number,
    date: addFormDate as Date,
    status: addFormStatus as '다읽음' | '읽는중' | '읽기시작함',
  };
  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    onChangeAddFormUseValidation(true);
    if (useMyBookAddFormHistoryValidation) {
      return mutate(body);
    }
  };
  return (
    <Container onSubmit={onSubmit}>
      <Header>
        <HeaderIconWrapper>
          <IconCalendar />
        </HeaderIconWrapper>
        <HeaderDescriptionContainer>
          <HeaderDescriptionMain>
            달력에 독서기록을 등록해요
          </HeaderDescriptionMain>
          <HeaderDescriptionSub>
            등록할 독서기록의 상태와 날짜를 입력해주세요.
          </HeaderDescriptionSub>
        </HeaderDescriptionContainer>
      </Header>
      <Content>
        <HistoryForm />
      </Content>
      <Footer>
        <Button isLoading={isLoading} type="submit">
          등록하기
        </Button>
      </Footer>
    </Container>
  );
}