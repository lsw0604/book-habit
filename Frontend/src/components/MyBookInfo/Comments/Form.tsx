import styled from 'styled-components';
import { useEffect } from 'react';

import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import useMyBookCommentMutation from '@queries/myBook/useMyBookCommentMutation';
import { useParams } from 'react-router-dom';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
`;

export default function Form() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [comment, setComment] = useState<string>('');
  const [useValidation, setUseValidation] = useState<boolean>(false);
  const { isLoading, mutate, isSuccess } = useMyBookCommentMutation(
    parseInt(users_books_id)
  );

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUseValidation(true);
    if (comment !== '') {
      mutate({ comment, users_books_id: parseInt(users_books_id) });
    }
  };

  useEffect(() => {
    return () => {
      setUseValidation(false);
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setComment('');
      setUseValidation(false);
    }
  }, [isSuccess]);

  return (
    <Container onSubmit={onSubmit}>
      <Stack>
        <Input
          isValid={comment === ''}
          onChange={onChange}
          errorMessage="한줄평을 입력해주세요."
          useValidation={useValidation}
        />
      </Stack>
      <Stack>
        <Button isLoading={isLoading}>등록</Button>
      </Stack>
    </Container>
  );
}
