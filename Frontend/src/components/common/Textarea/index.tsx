import { useState, ChangeEvent } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 400px;
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  border: 1px solid #ccc;
  padding: 8px;
  resize: vertical;
  overflow-y: hidden;
`;

export default function Index(): JSX.Element {
  const [text, setText] = useState<string>('');
  const [textareaHeight, setTextareaHeight] = useState<string>('auto');

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    setTextareaHeight('auto');
    const scrollHeight = event.target.scrollHeight;
    setTextareaHeight(`${scrollHeight}px`);
  };

  return (
    <Container>
      <Textarea
        style={{ height: textareaHeight }}
        value={text}
        onChange={handleTextChange}
        placeholder="Type something..."
      />
    </Container>
  );
}
