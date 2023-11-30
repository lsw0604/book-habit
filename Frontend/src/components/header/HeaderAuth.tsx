import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from 'components/common/Button';

const Container = styled.div`
  display: inline-flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: auto;
`;

export default function HeaderAuth() {
  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate('/register');
  };

  const navigateLogin = () => {
    navigate('/login');
  };

  const DROPDOWN_OPTIONS = [
    {
      label: '회원가입',
      onClick: navigateRegister,
    },
    {
      label: '로그인',
      onClick: navigateLogin,
    },
  ];

  return (
    <Container>
      {DROPDOWN_OPTIONS.map((option) => (
        <Wrapper key={option.label}>
          <Button onClick={option.onClick}>{option.label}</Button>
        </Wrapper>
      ))}
    </Container>
  );
}
