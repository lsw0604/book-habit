import { ChangeEvent } from 'react';
import styled from 'styled-components';

import Input from 'components/common/Input';
import Icon from 'components/common/Button/Icon';
import { IconSearch } from '@style/icons';

interface IProps {
  search: string;
  onChange: (query: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const IconWrapper = styled.div`
  width: 0px;
  height: 0px;
  position: relative;
  top: 5px;
  right: 35px;
`;

export default function SearchInput({ search, onChange, onClick }: IProps) {
  return (
    <Container>
      <Input
        style={{ borderRadius: '5rem', padding: '0rem 2rem' }}
        value={search}
        onChange={onChange}
      />
      <IconWrapper>
        <Icon onClick={onClick} icon={<IconSearch />}>
          Search
        </Icon>
      </IconWrapper>
    </Container>
  );
}
