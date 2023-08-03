import CheckBoxGroup from 'components/common/CheckBox';
import styled from 'styled-components';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { modalAtom } from 'recoil/modal';

const Container = styled.div`
  z-index: 9999;
  background-color: ${({ theme }) => theme.mode.sub};
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Index() {
  const [value, setValue] = useState<{ title: string }[]>([]);

  const onChange = (selected: { title: string }[]) => {
    setValue(selected);
  };

  const modalState = useRecoilValue(modalAtom);

  return (
    <Container>
      <div style={{ width: '100%' }}>
        {modalState.title}
        {modalState.isbn}
        <CheckBoxGroup<string>
          onChange={onChange}
          value={value}
          options={[{ title: 'test2' }, { title: 'test1' }]}
        />
      </div>
    </Container>
  );
}
