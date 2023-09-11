import styled from 'styled-components';
import { useEffect } from 'react';

import Textarea from 'components/common/Textarea';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import useMyBookCommentMutation from '@queries/myBook/useMyBookCommentMutation';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export default function Comment() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [comment, setComment] = useState<string>('');
  const [useValidation, setUseValidation] = useState<boolean>(false);
  const { isLoading, mutate, isSuccess } = useMyBookCommentMutation(
    parseInt(users_books_id)
  );

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

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setComment('');
      setUseValidation(false);
    }
  }, [isSuccess]);

  return (
    <Container>
      <Textarea />
    </Container>
  );
}
