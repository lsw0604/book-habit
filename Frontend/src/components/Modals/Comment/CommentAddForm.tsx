import styled from 'styled-components';
import { useEffect } from 'react';

import Textarea from 'components/common/Textarea';
import Select from 'components/common/Selector';
import StarRating from 'components/StarRating/Rating';
import Radio from 'components/common/Radio';
import useMyBookHook from '@hooks/useMyBookHook';
import { RadioGroupOptionType } from 'types/style';
import { IconLock, IconLockOpen } from '@style/icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  position: relative;
`;

const Stack = styled.div<{ conWid: string }>`
  width: ${({ conWid }) => conWid};
`;

export default function Comment() {
  const {
    myBookComment,
    myBookRating,
    myBookStatus,
    myBookUseValidation,
    myBookCommentIsOpen,
    onChangeMyBookComment,
    onChangeMyBookRating,
    onChangeMyBookStatus,
    onChangeMyBookCommentIsOpen,
    setMyBookState,
  } = useMyBookHook();

  useEffect(() => {
    setMyBookState((prev: MyBookAtomType) => ({
      ...prev,
      comment: '',
      comment_id: undefined,
      date: null,
      rating: 0,
      status: '',
      useValidation: false,
    }));
  }, []);

  const options: RadioGroupOptionType<boolean>[] = [
    {
      label: '비공개',
      value: false,
      icon: <IconLock />,
    },
    {
      label: '공개',
      value: true,
      icon: <IconLockOpen />,
    },
  ];

  return (
    <Container>
      <Stack conWid="100%" style={{ display: 'flex' }}>
        <Radio
          value={myBookCommentIsOpen}
          onChange={onChangeMyBookCommentIsOpen}
          options={options}
        />
      </Stack>
      <Box>
        <Stack conWid="25%">
          <Select
            label="상태"
            isValid={myBookStatus === ''}
            value={myBookStatus}
            onChange={onChangeMyBookStatus as (value?: string) => void}
            options={['읽는중', '다읽음', '읽기전']}
            useValidation={myBookUseValidation}
            errorMessage="상태를 선택해주세요."
          />
        </Stack>
        <Stack conWid="75%">
          <StarRating
            label="평점"
            useValidation={myBookUseValidation}
            errorMessage="평점을 선택해 주세요."
            isValid={myBookRating === 0}
            rating={myBookRating}
            onChange={onChangeMyBookRating}
          />
        </Stack>
      </Box>
      <Textarea
        label="한줄평"
        useValidation={myBookUseValidation}
        isValid={myBookComment === ''}
        errorMessage="한줄평을 입력해주세요."
        value={myBookComment}
        onChange={onChangeMyBookComment}
        placeholder="이 책에대한 느낌을 설명해주세요."
      />
    </Container>
  );
}