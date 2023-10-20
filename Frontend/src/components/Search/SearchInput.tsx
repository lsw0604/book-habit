import { ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

import Input from 'components/common/Input';
import Icon from 'components/common/Button/Icon';
import { IconSearch } from '@style/icons';

interface IProps {
  search: string;
  onChange: (query: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const Container = styled.form`
  width: 100%;
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
  position: relative;
`;

const IconWrapper = styled.div`
  width: 0px;
  height: 0px;
  position: absolute;
  top: 5px;
  right: 55px;
`;

export default function SearchInput({ search, onChange, onSubmit }: IProps) {
  return (
    <Container onSubmit={onSubmit}>
      <Input
        style={{ borderRadius: '2rem', padding: '0 1rem' }}
        value={search}
        onChange={onChange}
      />
      <IconWrapper>
        <Icon type="submit" icon={<IconSearch />}>
          Search
        </Icon>
      </IconWrapper>
    </Container>
  );
}
