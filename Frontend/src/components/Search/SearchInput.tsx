import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from 'react';
import styled from 'styled-components';

import Input from 'components/common/Input';
import Icon from 'components/common/Button/Icon';
import { IconSearch } from '@style/icons';
import useBookSearchInfinityQuery from '@queries/book/useBookSearchInfinityQuery';

interface IProps {
  search: string;
  onChange: (query: ChangeEvent<HTMLInputElement>) => void;
  setQuery: Dispatch<SetStateAction<string>>;
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

export default function SearchInput({ search, onChange, setQuery }: IProps) {
  const { fetchNextPage } = useBookSearchInfinityQuery(search);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setQuery(search);
    await fetchNextPage();
  };

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
