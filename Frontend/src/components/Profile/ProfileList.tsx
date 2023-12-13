import { useState, memo } from 'react';
import styled from 'styled-components';

import { IconCommentDots, IconHeart } from '@style/icons';
import { RadioGroupOptionType } from 'types/style';
import RadioButton from 'components/common/Radio/RadioButton';
import ProfileLikeList from 'components/Profile/ProfileLikeList';
import ProfileReplyList from 'components/Profile/ProfileReplyList';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  position: relative;
  justify-content: space-between;
`;

const Stack = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 16px;
  box-shadow: ${({ theme }) => theme.shadow.md};
  padding: 0.5rem;
  border-radius: 1rem;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
`;

const RADIO_OPTIONS: RadioGroupOptionType<string>[] = [
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

export default function ProfileList() {
  const [value, setValue] = useState<'like' | 'reply'>('like');

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
          options={RADIO_OPTIONS}
        />
      </Stack>
      <Content>
        {value === 'like' && <ProfileLikeList />}
        {value === 'reply' && <ProfileReplyList />}
      </Content>
    </Container>
  );
}
