import useMyBookExist from '@hooks/useMyBookExistHook';
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { bottomSheetAtom } from 'recoil/bottomSheet';
import styled from 'styled-components';

const Container = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Stack = styled.div`
  height: 100%;
  display: flex;
  border-radius: 12px;
  justify-content: center;
  align-items: center;
  background-color: rgba(150, 150, 150, 0.1);
  color: ${({ theme }) => theme.mode.typo_main};
`;

export default function Skeleton() {
  const { isbn } = useRecoilValue(bottomSheetAtom);
  const { data } = useMyBookExist(isbn);

  const disabledHandler = (
    status?: '다읽음' | '읽는중' | '읽고싶음' | '미등록'
  ) => {
    if (status === '미등록') {
      return true;
    }
    return false;
  };

  return (
    <Container
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.3,
      }}
    >
      <Stack>
        {disabledHandler(data?.status)
          ? '어떤 책인지 선택해주세요.'
          : '이미 등록된 책입니다.'}
      </Stack>
    </Container>
  );
}