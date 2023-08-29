import styled from 'styled-components';
import { useState, FormEvent } from 'react';

import RadioButton from 'components/common/Radio/RadioButton';
import Button from 'components/common/Button';
import { IconBook } from '@style/icons';
import { RadioGroupOptionType } from 'types/style';
import Skeleton from 'components/MyBookInfo/Skeleton';
import { useParams } from 'react-router-dom';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 8px;
  min-height: 10rem;
`;

const options: RadioGroupOptionType<string>[] = [
  {
    label: '시작한 날',
    value: '시작',
    icon: <IconBook />,
    description: '책을 읽기 시작했어요.',
  },
  {
    label: '읽은 날',
    value: '중간',
    icon: <IconBook />,
    description: '책을 읽은 날이에요.',
  },
  {
    label: '다 읽은 날',
    value: '끝남',
    icon: <IconBook />,
    description: '책을 다 읽었어요.',
  },
];

export default function AddForm() {
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;
  const [status, setStatus] = useState<'' | '시작' | '중간' | '끝남'>('');

  const onChange = (value: string) => {
    setStatus(value as '' | '시작' | '중간' | '끝남');
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <Container onSubmit={onSubmit}>
      <Stack>
        <RadioButton<string>
          value={status}
          options={options}
          onChange={onChange}
        />
      </Stack>
      <Content>{status === '' ? <Skeleton /> : <div>AddForm</div>}</Content>
      <Stack>
        <Button type="submit">기록하기</Button>
      </Stack>
    </Container>
  );
}
