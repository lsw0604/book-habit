import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode, lazy, Suspense } from 'react';

import Loader from 'components/common/loader';
import LoginMessage from 'components/Modals/Login/LoginMessage';
import SearchBookRegister from 'components/Modals/SearchBook/SearchBookRegister';
import useModalHook from '@hooks/useModalHook';

interface IModalComponent {
  [key: string]: ReactNode;
}

const Container = styled(motion.div)`
  position: absolute;
  z-index: 9999;
  width: 100%;
  height: auto;
  min-height: 30%;
  bottom: 0;
  border-radius: 1rem 1rem 0 0;
  padding: 1rem;
  display: grid;
  background-color: ${({ theme }) => theme.mode.sub};

  @media screen and (min-width: 768px) {
    position: static;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    width: 40%;
  }
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommentModifyModal = lazy(
  () => import('components/Modals/Comment/CommentModify')
);
const CommentRegisterModal = lazy(
  () => import('components/Modals/Comment/CommentRegister')
);
const CommentDeleteModal = lazy(
  () => import('components/Modals/Comment/CommentDelete')
);
const HistoryRegisterModal = lazy(
  () => import('components/Modals/History/HistoryRegister')
);
const HistoryDeleteModal = lazy(
  () => import('components/Modals/History/HistoryDelete')
);
const ReplyDeleteModal = lazy(
  () => import('components/Modals/Reply/ReplyDelete')
);
const MyBookDeleteModal = lazy(
  () => import('components/Modals/MyBook/MyBookDelete')
);
const ProfileModifyModal = lazy(
  () => import('components/Modals/Profile/ProfileModify')
);

const modalComponent: IModalComponent = {
  isLogin: <LoginMessage />,
  registerSearchBook: <SearchBookRegister />,
  modifyComment: <CommentModifyModal />,
  registerComment: <CommentRegisterModal />,
  deleteComment: <CommentDeleteModal />,
  registerHistory: <HistoryRegisterModal />,
  deleteHistory: <HistoryDeleteModal />,
  deleteReply: <ReplyDeleteModal />,
  deleteMyBook: <MyBookDeleteModal />,
  modifyProfile: <ProfileModifyModal />,
};

const onChangeModalComponent = (ctx?: ModalComponentType) => {
  if (ctx === undefined || !modalComponent[ctx]) return null;
  return modalComponent[ctx];
};

export default function Modal() {
  const { modalStateType } = useModalHook();

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
      <Suspense
        fallback={
          <LoadingWrapper>
            <Loader size={2} />
          </LoadingWrapper>
        }
      >
        {onChangeModalComponent(modalStateType)}
      </Suspense>
    </Container>
  );
}
