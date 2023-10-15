import { customize } from '@style/colors';

export const StatusColorObj: Record<HistoryStatusType, string> = {
  읽는중: customize.rose['300'],
  다읽음: customize.teal['300'],
  읽기시작함: customize.yellow['300'],
  읽고싶음: customize.orange['300'],
};

export const StatusWordObj: Record<HistoryStatusType, string> = {
  읽기시작함: '읽기 시작했어요.',
  다읽음: '다 읽었어요.',
  읽고싶음: '읽고싶은 책 목록에 찜했어요.',
  읽는중: '읽었어요.',
};
