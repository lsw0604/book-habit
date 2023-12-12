import styled from 'styled-components';
import { useCallback, useState, ChangeEvent, FormEvent } from 'react';

import TextArea from 'components/common/Textarea';
import Button from 'components/common/Button';
import useCommentsReplyMutation from '@queries/comments/useCommentsReplyMutation';
import { useParams } from 'react-router-dom';

const Container = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function CommentReplyForm() {
  const { comment_id } = useParams();
  if (!comment_id) return <Container>잘못된 접근입니다.</Container>;

  const [reply, setReply] = useState<string>('');
  const [useValidation, setUseValidation] = useState<boolean>(false);

  const { mutate } = useCommentsReplyMutation(parseInt(comment_id));

  const replyHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setReply(event.target.value);
    },
    []
  );

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setUseValidation(true);

    if (reply !== '') {
      mutate({
        comment_id: parseInt(comment_id),
        body: {
          reply,
        },
      });
      setUseValidation(false);
      setReply('');
    }
  };

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
