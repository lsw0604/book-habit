import styled from 'styled-components';
import {
  useCallback,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from 'react';

import TextArea from 'components/common/Textarea';
import Button from 'components/common/Button';

import useCommentsReplyMutation from '@queries/comments/useCommentsReplyMutation';

interface IProps {
  comment_id: string;
}

const Container = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function CommentDetailReplyForm({ comment_id }: IProps) {
  const [reply, setReply] = useState<string>('');
  const [useValidation, setUseValidation] = useState<boolean>(false);

  const COMMENT_ID = parseInt(comment_id);

  const { mutate } = useCommentsReplyMutation(COMMENT_ID);

  const replyHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setReply(event.target.value);
    },
    []
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setUseValidation(true);
    if (reply === '') return null;

    mutate({
      comment_id: COMMENT_ID,
      body: {
        reply,
      },
    });
    setUseValidation(false);
    setReply('');
  };

  useEffect(() => {
    if (!reply) setReply('');

    setUseValidation(false);
  }, [reply]);

  return (
    <Container onSubmit={onSubmit}>
      <TextArea
        onChange={(event) => replyHandler(event)}
        value={reply}
        isValid={reply === ''}
        useValidation={useValidation}
        errorMessage="댓글을 입력해주세요."
      />
      <Button>등록하기</Button>
    </Container>
  );
}