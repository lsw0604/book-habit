import styled, { css } from 'styled-components';

interface IProps {
  content: string;
  mode: 'detail' | 'item';
  onClick?: () => void;
}

const COMMENT_DETAIL_CSS = css`
  height: auto;
`;

const COMMENT_ITEM_CSS = css`
  height: 100px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
`;

const Container = styled.div<{ mode: 'detail' | 'item' }>`
  width: 100%;
  font-size: 18px;
  height: auto;
  min-height: 100px;
  line-height: 25px;
  white-space: pre-line;
  color: ${({ theme }) => theme.mode.typo_main};
  ${({ mode }) => mode === 'detail' && COMMENT_DETAIL_CSS}
  ${({ mode }) => mode === 'item' && COMMENT_ITEM_CSS}
`;

export default function CommentsBody({ content, mode, onClick }: IProps) {
  return (
    <Container onClick={onClick} mode={mode}>
      {content}
    </Container>
  );
}
