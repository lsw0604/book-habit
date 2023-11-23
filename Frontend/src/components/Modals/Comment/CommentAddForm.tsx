import styled from 'styled-components';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Textarea from 'components/common/Textarea';
import Select from 'components/common/Selector';
import StarRating from 'components/StarRating/Rating';
import Radio from 'components/common/Radio';
import { RadioGroupOptionType } from 'types/style';
import { IconLock, IconLockOpen } from '@style/icons';
import { myBookAtom } from 'recoil/myBook';

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

export default function CommentAddForm() {
  const [myBookState, setMyBookState] = useRecoilState(myBookAtom);

  const onChangeRating = useCallback((rating: number) => {
    setMyBookState((prev) => ({ ...prev, rating }));
  }, []);
  const onChangeStatus = useCallback((status: string) => {
    setMyBookState((prev) => ({ ...prev, status }));
  }, []);
  const onChangeComment = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setMyBookState((prev) => ({ ...prev, comment: event.target.value }));
    },
    []
  );
  const onChangeCommentIsOpen = useCallback((comment_isOpen: boolean) => {
    setMyBookState((prev) => ({ ...prev, comment_isOpen }));
  }, []);

  const initialBookState = useCallback(() => {
    setMyBookState((prev) => ({
      ...prev,
      comment: '',
      comment_isOpen: false,
      rating: 0,
      status: '',
      useValidation: false,
    }));
  }, []);

  useEffect(() => {
    initialBookState();
  }, []);

  return (
    <Container>
      <Stack conWid="100%" style={{ display: 'flex' }}>
        <Radio<boolean>
          value={myBookState.comment_isOpen}
          onChange={onChangeCommentIsOpen}
          options={options}
        />
      </Stack>
      <Box>
        <Stack conWid="25%">
          <Select
            label="상태"
            isValid={myBookState.status === ''}
            value={myBookState.status}
            onChange={onChangeStatus as (status?: string) => void}
            options={['읽는중', '다읽음', '읽기전']}
            useValidation={myBookState.useValidation}
            errorMessage="상태를 선택해주세요."
          />
        </Stack>
        <Stack conWid="75%">
          <StarRating
            label="평점"
            useValidation={myBookState.useValidation}
            errorMessage="평점을 선택해 주세요."
            isValid={myBookState.rating === 0}
            rating={myBookState.rating}
            onChange={onChangeRating}
          />
        </Stack>
      </Box>
      <Textarea
        label="한줄평"
        useValidation={myBookState.useValidation}
        isValid={myBookState.comment === ''}
        errorMessage="한줄평을 입력해주세요."
        value={myBookState.comment}
        onChange={onChangeComment}
        placeholder="이 책에대한 느낌을 설명해주세요."
      />
    </Container>
  );
}
