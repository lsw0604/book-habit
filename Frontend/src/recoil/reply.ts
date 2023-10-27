import { atom } from 'recoil';
import { v4 } from 'uuid';

const REPLY_ATOM_KEY = `REPLY_ATOM_KEY/${v4()}`;

export const replyAtom = atom<ReplyAtomType>({
  key: REPLY_ATOM_KEY,
  default: {
    reply_id: 0,
    comment_id: 0,
  },
});
