import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

import NeedLogin from 'components/common/NeedLogin';
import SearchBookRegister from 'components/Modals/SearchBook/SearchBookRegister';

import CommentModify from 'components/Modals/Comment/CommentModify';
import CommentRegister from 'components/Modals/Comment/CommentRegister';
import CommentDelete from 'components/Modals/Comment/CommentDelete';
import HistoryRegister from 'components/Modals/History/HistoryRegister';
import HistoryDelete from 'components/Modals/History/HistoryDelete';

import useModalHook from '@hooks/useModalHook';
import ReplyDelete from 'components/Modals/Reply/ReplyDelete';

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

export default function BottomSheet() {
  const { modalStateType } = useModalHook();

  const SwitchingComponent = useMemo(() => {
    switch (modalStateType) {
      case 'isLogin':
        return <NeedLogin />;
      case 'registerSearchBook':
        return <SearchBookRegister />;
      case 'modifyComment':
        return <CommentModify />;
      case 'registerComment':
        return <CommentRegister />;
      case 'deleteComment':
        return <CommentDelete />;
      case 'registerHistory':
        return <HistoryRegister />;
      case 'deleteHistory':
        return <HistoryDelete />;
      case 'deleteReply':
        return <ReplyDelete />;
      default:
        return null;
    }
  }, [modalStateType]);

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
      {SwitchingComponent}
    </Container>
  );
}
