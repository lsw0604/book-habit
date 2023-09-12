import styled from 'styled-components';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Textarea from 'components/common/Textarea';
import Select from 'components/common/Selector';
import StarRating from 'components/StarRating/Rating';
import useMyBookAddFormHook from '@hooks/useMyBookAddFormHook';

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
  const { users_books_id } = useParams();
  if (!users_books_id) return <div>잘못된 접근입니다.</div>;

  const {
    addFormComment,
    addFormRating,
    addFormStatus,
    addFormUseValidation,
    onChangeAddFormComment,
    onChangeAddFormRating,
    onChangeAddFormStatus,
    onChangeAddFormStateInitial,
  } = useMyBookAddFormHook();

  useEffect(() => {
    onChangeAddFormStateInitial();
  }, []);

  return (
    <Container>
      <Box>
        <Stack conWid="30%">
          <Select
            label="상태"
            isValid={addFormStatus === ''}
            value={addFormStatus}
            onChange={onChangeAddFormStatus as (value?: string) => void}
            options={['읽는중', '다읽음', '읽기전']}
            useValidation={addFormUseValidation}
            errorMessage="상태를 선택해주세요."
          />
        </Stack>
        <Stack conWid="70%">
          <StarRating
            label="평점"
            useValidation={addFormUseValidation}
            errorMessage="평점을 선택해 주세요."
            isValid={addFormRating === 0}
            rating={addFormRating}
            onChange={onChangeAddFormRating}
          />
        </Stack>
      </Box>
      <Textarea
        label="한줄평"
        useValidation={addFormUseValidation}
        isValid={addFormComment === ''}
        errorMessage="한줄평을 입력해주세요."
        value={addFormComment}
        onChange={onChangeAddFormComment}
        placeholder="이 책에대한 느낌을 설명해주세요."
      />
    </Container>
  );
}
