import {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import Button from 'components/common/Button';
import Input from 'components/common/Input';
import { IconFemale, IconMale, IconNumber, IconPerson } from '@style/icons';
import useToastHook from '@hooks/useToastHook';
import RadioGroup from 'components/common/Radio';

const Container = styled.form`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  max-width: 375px;
  width: 100%;
  height: auto;
`;

const Box = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  border-radius: 0.75rem;
  flex-direction: column;
  width: 100%;
  display: flex;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const Header = styled.h1`
  margin-bottom: 16px;
  text-align: center;
  font-size: 28px;
  line-height: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.sub};
`;

export default function KakaoRegister() {
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | ''>('');
  const [age, setAge] = useState<number | ''>('');

  const [useValidation, setUseValidation] = useState(false);

  const onChangeName = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const onChangeGender = (ctx: 'male' | 'female' | '') => {
    setGender(ctx);
  };

  const onChangeAge = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const isValid = /^\d+$/.test(value);

    if (isValid) {
      setAge(parseInt(value, 10));
    } else {
      setAge('');
    }
  }, []);

  const navigate = useNavigate();
  const { addToast } = useToastHook();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUseValidation(true);

    await fetch('http://localhost:3001/api/auth/kakao/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Allow-Access-Control-Origin': '*',
        'Allow-Access-Control-Credential': 'true',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        gender,
        age,
      }),
    }).then((res) => res.json());

    if (name && gender && age) {
      return;
    } else {
      addToast({ status: 'error', message: '추가 정보 입력 폼을 지켜주세요.' });
    }
  };

  useEffect(() => {
    return () => {
      setUseValidation(false);
    };
  }, []);

  return (
    <Container onSubmit={onSubmit}>
      <Box>
        <Header>추가 정보 입력</Header>
        <Box style={{ flexDirection: 'row', gap: '8px' }}>
          <Stack>
            <Input
              icon={<IconPerson />}
              label="이름"
              type="text"
              value={name}
              onChange={onChangeName}
              useValidation={useValidation}
              isValid={!name}
              errorMessage="이름을 입력해주세요."
            />
          </Stack>
          <Stack>
            <Input
              type="number"
              label="나이"
              errorMessage="나이를 입력해주세요."
              icon={<IconNumber />}
              isValid={!age}
              useValidation={useValidation}
              value={age}
              onChange={onChangeAge}
            />
          </Stack>
        </Box>
        <Stack>
          <RadioGroup
            label="성별"
            isValid={!gender}
            useValidation={useValidation}
            value={gender}
            onChange={onChangeGender}
            errorMessage="성별을 입력해주세요."
            options={[
              {
                label: '남자',
                icon: <IconMale />,
                value: 'male',
                description: 'male',
              },
              {
                label: '여자',
                icon: <IconFemale />,
                value: 'female',
                description: 'female',
              },
            ]}
          />
        </Stack>
        <Stack style={{ marginBottom: '0px' }}>
          {/* <Button type="submit" isLoading={isLoading}> */}
          <Button type="submit">등록</Button>
        </Stack>
      </Box>
    </Container>
  );
}
