import { useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import styled from 'styled-components';

import Input from 'components/common/Input';
import Icon from 'components/common/Button/Icon';
import { IconSearch } from '@style/icons';

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

export default function SearchInput() {
  const [keyword, setKeyword] = useState<string>('');

  const navigate = useNavigate();

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, []);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    navigate(`?keyword=${encodeURIComponent(keyword)}`);
  };

  return (
    <Container onSubmit={onSubmit}>
      <Input
        className="circle_btn"
        style={{ borderRadius: '2rem', padding: '0 1rem' }}
        value={keyword}
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
