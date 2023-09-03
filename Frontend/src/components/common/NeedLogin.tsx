import { ContactFingerImage } from '@style/icons';
import styled from 'styled-components';
import Button from 'components/common/Button';

const SVGWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 100%;
    max-width: 250px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 24px;
  line-height: 22px;
`;

const Description = styled.div`
  color: ${({ theme }) => theme.mode.typo_sub};
  opacity: 0.6;
  font-size: 15px;
`;

export default function NeedLogin() {
  return (
    <>
      <SVGWrapper>
        <ContactFingerImage />
      </SVGWrapper>
      <Container>
        <Stack
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <Title>로그인이 필요해에요.</Title>
          <Description>로그인을 하시고 서비스를 이용해주세요.</Description>
          <Description>만약 아이디가 없다면 회원가입을 해주세요.</Description>
        </Stack>
        <Stack>
          <a href="/login">
            <Button type="button" onClick={() => console.log('ss')}>
              로그인하러가기
            </Button>
          </a>
        </Stack>
      </Container>
    </>
  );
}
