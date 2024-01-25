import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import TextArea from 'components/common/Textarea';
import Button from 'components/common/Button';

import { InputType, schema } from './type';
import useCommentsReplyRegisterMutation from '@queries/comments/useCommentsReplyRegisterMutation';

interface IProps {
  comment_id: number;
}

const Container = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function CommentDetailReplyForm({ comment_id }: IProps) {
  const { register, handleSubmit, reset } = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  const { mutate } = useCommentsReplyRegisterMutation(comment_id);

  const onSubmit = (data: InputType) => {
    mutate(
      {
        comment_id,
        body: {
          reply: data.reply,
        },
      },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <TextArea register={{ ...register('reply') }} />
      <Button>등록하기</Button>
    </Container>
  );
}
