import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Textarea = styled.textarea`
  min-width: 100%;
  min-height: 130px;
  border: none;
  padding: 8px;
  resize: vertical;
  overflow-y: hidden;
`;

export default function Index(): JSX.Element {
  const [text, setText] = useState<string>('');
  const [textareaHeight, setTextareaHeight] = useState<string>('auto');
  const [textareaWidth, setTextareaWidth] = useState<string>('auto');

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setTextareaHeight('auto');
    const textWidth = event.target.scrollWidth;
    const scrollHeight = event.target.scrollHeight;
    setTextareaHeight(`${scrollHeight}px`);
    setTextareaWidth(`${textWidth}px`);
  };

  return (
    <Container>
      <Textarea
        style={{ height: textareaHeight, width: textareaWidth }}
        onClick={(e) => {
          console.log(e);
        }}
        value={text}
        onChange={handleTextChange}
        placeholder="한줄평 추가하기..."
      />
    </Container>
  );
}
