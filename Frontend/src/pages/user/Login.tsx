import styled from 'styled-components';

import Input from '../../components/common/Input';
import { IconBeach } from '@style/icons';

export default function Login() {
  return (
    <>
      <Layout>
        <Container>
          <Contents>
            <Form>
              <FormContainer>
                <LoginForm>
                  <Input label="login" icon={<IconBeach />} />
                  <br />
                  <Input />
                  <br />
                  <Input />
                  <br />
                </LoginForm>
              </FormContainer>
            </Form>
          </Contents>
        </Container>
      </Layout>
    </>
  );
}

const Layout = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  width: 100%;
  height: 100%;
  display: flex;
`;

const Container = styled.div`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: 786px) {
    max-width: 768px;
  }
`;

const Contents = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  @media screen and (min-width: 768px) {
    text-align: left;
    align-items: center;
    flex-direction: row;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: 768px) {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
  }
`;

const FormContainer = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media screen and (min-width: 768px) {
    width: 100%;
    margin-right: 0px;
    margin-left: 0px;
  }
`;

const LoginForm = styled.div`
  box-shadow: ${({ theme }) => theme.shadow.xxl};

  background-color: ${({ theme }) => theme.mode.main};
  padding: 2.5rem;
  border-radius: 0.75rem;
  flex-direction: column;
  width: 100%;
  display: flex;
`;
