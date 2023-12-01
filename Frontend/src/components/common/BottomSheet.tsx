import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode, lazy } from 'react';

import NeedLogin from 'components/common/NeedLogin';
import SearchBookRegister from 'components/Modals/SearchBook/SearchBookRegister';
import useModalHook from '@hooks/useModalHook';

interface IBottomSheetObj {
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
  @media screen and (min-width: 1280px) {
    position: static;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30%;
    border-radius: 1rem;
  }
`;

const CommentModify = lazy(
  () => import('components/Modals/Comment/CommentModify')
);
const CommentRegister = lazy(
  () => import('components/Modals/Comment/CommentRegister')
);
const CommentDelete = lazy(
  () => import('components/Modals/Comment/CommentDelete')
);
const HistoryRegister = lazy(
  () => import('components/Modals/History/HistoryRegister')
);
const HistoryDelete = lazy(
  () => import('components/Modals/History/HistoryDelete')
);
const ReplyDelete = lazy(() => import('components/Modals/Reply/ReplyDelete'));
const MyBookDelete = lazy(() => import('components/Modals/MyBookDelete'));
const ProfileModify = lazy(
  () => import('components/Modals/Profile/ProfileModify')
);

const bottomSheetComponent: IBottomSheetObj = {
  isLogin: <NeedLogin />,
  registerSearchBook: <SearchBookRegister />,
  modifyComment: <CommentModify />,
  registerComment: <CommentRegister />,
  deleteComment: <CommentDelete />,
  registerHistory: <HistoryRegister />,
  deleteHistory: <HistoryDelete />,
  deleteReply: <ReplyDelete />,
  deleteMyBook: <MyBookDelete />,
  modifyProfile: <ProfileModify />,
};

const onChangeBottomSheetComponent = (ctx?: ModalBottomSheetType) => {
  if (ctx === undefined || !bottomSheetComponent[ctx]) return null;
  return bottomSheetComponent[ctx];
};

export default function BottomSheet() {
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
      {onChangeBottomSheetComponent(modalStateType)}
    </Container>
  );
}
