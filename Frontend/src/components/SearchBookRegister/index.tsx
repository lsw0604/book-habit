import { FormEvent, ReactNode } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import Button from 'components/common/Button';
import { searchBookAtom } from 'recoil/searchBook';
import { userAtom } from 'recoil/user';
import useToastHook from '@hooks/useToastHook';
import useBookRegisterMutation from '@queries/book/useBookRegisterMutation';

const Container = styled.form`
  position: relative;
`;

export default function SearchBookRegisterForm({
  children,
}: {
  children: ReactNode;
}) {
  const searchBookState = useRecoilValue(searchBookAtom);
  const { isLogged } = useRecoilValue(userAtom);

  const { addToast } = useToastHook();

  const { mutate, isLoading } = useBookRegisterMutation();

  const { authors, ...rest } = searchBookState;

  const registerBody: BookRegisterType = {
    authors: authors.join(','),
    ...rest,
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLogged)
      return addToast({ message: '로그인 해주세요.', status: 'info' });

    mutate(registerBody);
  };

  return (
    <Container onSubmit={onSubmit}>
      {children}
      <Button type="submit" isLoading={isLoading}>
        추가하기
      </Button>
    </Container>
  );
}
