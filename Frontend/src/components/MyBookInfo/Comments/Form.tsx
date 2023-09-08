import styled from 'styled-components';

import Input from 'components/common/Input';
import Button from 'components/common/Button';
import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
`;

export default function Form() {
  const [value, setValue] = useState<string>('');
  const [useValidation, setUseValidation] = useState<boolean>(false);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUseValidation(true);
    console.log(value);
  };

  return (
    <Container onSubmit={onSubmit}>
      <Stack>
        <Input
          isValid={value === ''}
          onChange={onChange}
          errorMessage="한줄평을 입력해주세요."
          useValidation={useValidation}
        />
      </Stack>
      <Stack>
        <Button>등록</Button>
      </Stack>
    </Container>
  );
}
