import styled from 'styled-components';
import { useState, memo } from 'react';
import { IconCommentDots, IconHeart } from '@style/icons';
import { RadioGroupOptionType } from 'types/style';
import RadioButton from 'components/common/Radio/RadioButton';
import ProfileLikeList from './ProfileLikeList';
import ProfileReplyList from './ProfileReplyList';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Stack = styled.div`
  width: 100%;
  position: relative;
  margin-bottom: 8px;
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: 0.5rem;
  border-radius: 1rem;
`;

export default function ProfileList() {
  const [value, setValue] = useState<'like' | 'reply'>('like');

  const options: RadioGroupOptionType<string>[] = [
    {
      label: 'LIKE',
      value: 'like',
      icon: <IconHeart />,
      description: '내가 누른 좋아요',
    },
    {
      label: 'REPLY',
      value: 'reply',
      icon: <IconCommentDots />,
      description: '내가 단 댓글',
    },
  ];

  const onChange = (value: string) => {
    setValue(value as 'like' | 'reply');
  };

  const MemorizedRadioButton = memo(RadioButton<string>);

  return (
    <Container>
      <Stack>
        <MemorizedRadioButton
          onChange={onChange}
          value={value}
          options={options}
        />
      </Stack>
      {value === 'like' && <ProfileLikeList />}
      {value === 'reply' && <ProfileReplyList />}
    </Container>
  );
}
