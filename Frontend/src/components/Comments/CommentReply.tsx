import styled from 'styled-components';
import { useCallback, useState, ChangeEvent } from 'react';

import TextArea from 'components/common/Textarea';
import Button from 'components/common/Button';
import { IconCommentDots, IconComments } from '@style/icons';

const Container = styled.div`
  width: 100%;
`;

export default function CommentReply() {
  const [reply, setReply] = useState<string>('');

  const replyHandler = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setReply(event.target.value);
    },
    []
  );

  return (
    <Container>
      <div>list</div>
      <IconCommentDots />
      <TextArea onChange={(event) => replyHandler(event)} value={reply} />
      <Button>Submit</Button>
    </Container>
  );
}
