import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from 'components/common/Input';
import { IconSearch } from '@style/icons';

import { InputType, schema } from './type';

const Container = styled.form`
  width: 100%;
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
  position: relative;
`;

export default function SearchInput() {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: InputType) => {
    return navigate(`?keyword=${data.search}`);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Input
        className="circle_btn"
        style={{ borderRadius: '2rem', padding: '0 1rem' }}
        placeholder="찾고자하는 책 제목을 입력해주세요."
        icon={<IconSearch />}
        register={{ ...register('search') }}
      />
      <button type="submit" hidden />
    </Container>
  );
}
