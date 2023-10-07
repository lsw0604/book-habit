import { memo } from 'react';
import styled from 'styled-components';
import { useCallback, useState, ChangeEvent, FormEvent } from 'react';

import TextArea from 'components/common/Textarea';
import Button from 'components/common/Button';
import useCommentsReplyMutation from '@queries/comments/useCommentsReplyMutation';
import { useLocation } from 'react-router-dom';

const Container = styled.form`
  width: 100%;
`;

const IconWrapper = styled.div`
  svg {
    width: 1rem;
  }
`;

export default function CommentReply() {
  const comment_id = useLocation().pathname.split('/')[2];
  const [reply, setReply] = useState<string>('');
  const [useValidation, setUseValidation] = useState<boolean>(false);

  const { mutate } = useCommentsReplyMutation(parseInt(comment_id));

  const replyHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setReply(event.target.value);
    },
    []
  );

  console.log(comment_id);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setUseValidation(true);

    mutate({
      comment_id: parseInt(comment_id),
      body: {
        reply,
      },
    });
    console.log(reply);
  };

  return (
    <Container onSubmit={onSubmit}>
      <div>list</div>
      <TextArea
        onChange={(event) => replyHandler(event)}
        value={reply}
        isValid={reply === ''}
        useValidation={useValidation}
        errorMessage="댓글을 입력해주세요."
      />
      <Button>Submit</Button>
    </Container>
  );
}
