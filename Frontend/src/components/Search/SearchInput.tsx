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

  .circle_btn {
    &::placeholder {
      line-height: 16px;
      font-size: 14px;
      font-weight: 700;
      color: ${({ theme }) => theme.mode.typo_sub};
    }
  }
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
        className="circle_btn"
        style={{ borderRadius: '2rem', padding: '0 1rem' }}
        value={search}
        onChange={onChange}
        placeholder="찾고자하는 책 제목을 입력해주세요."
      />
      <IconWrapper>
        <Icon type="submit" icon={<IconSearch />}>
          Search
        </Icon>
      </IconWrapper>
    </Container>
  );
}
