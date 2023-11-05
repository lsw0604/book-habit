import { TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import ErrorMessage from 'components/common/Message/ErrorMessage';

const Container = styled.div<{ conWidth: string; conHeight: string }>`
  width: ${({ conWidth }) => conWidth};
  height: ${({ conHeight }) => conHeight};
`;

const Label = styled.span`
  margin-left: 10px;
  margin-bottom: 8px;
  display: block;
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 14px;
  line-height: 18px;
`;

const Textarea = styled.textarea`
  width: 100%;
  max-width: 100%;
  min-height: 70px;
  border: none;
  padding: 1rem;
  resize: both;
  background-color: ${({ theme }) => theme.mode.main};
  color: ${({ theme }) => theme.mode.typo_sub};
  overflow-y: hidden;
  font-size: 16px;
  border-radius: 1rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.mode.typo_sub};
  }
`;

interface IProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'label'> {
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
  label?: string;
  conWidth?: string;
  conHeight?: string;
}

export default function Index({
  isValid,
  useValidation,
  errorMessage,
  label,
  conWidth = '100%',
  conHeight = 'auto',
  ...props
}: IProps): JSX.Element {
  return (
    <>
      {label && <Label>{label}</Label>}
      <Container conWidth={conWidth} conHeight={conHeight}>
        <Textarea {...props} />
      </Container>
      {errorMessage && isValid && useValidation && (
        <ErrorMessage message={errorMessage} />
      )}
    </>
  );
}
