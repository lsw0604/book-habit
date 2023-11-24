import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import NeedLogin from 'components/common/NeedLogin';
import SearchBookRegister from 'components/Modals/SearchBook/SearchBookRegister';

import CommentModify from 'components/Modals/Comment/CommentModify';
import CommentRegister from 'components/Modals/Comment/CommentRegister';
import CommentDelete from 'components/Modals/Comment/CommentDelete';
import HistoryRegister from 'components/Modals/History/HistoryRegister';
import HistoryDelete from 'components/Modals/History/HistoryDelete';
import ReplyDelete from 'components/Modals/Reply/ReplyDelete';
import MyBookDelete from 'components/Modals/MyBookDelete';
import ProfileModify from 'components/Modals/Profile/ProfileModify';

import useModalHook from '@hooks/useModalHook';

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

interface IBottomSheetObj {
  [key: string]: ReactNode;
}

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
