import { customize } from '@style/colors';

export const STATUS_COLOR_OBJECT: Record<HistoryStatusType, string> = {
  읽는중: customize.rose['300'],
  다읽음: customize.teal['300'],
  읽기시작함: customize.yellow['300'],
  읽고싶음: customize.orange['300'],
};

export const STATUS_WORD_OBJECT: Record<HistoryStatusType, string> = {
  읽기시작함: '읽기 시작했어요.',
  다읽음: '다 읽었어요.',
  읽고싶음: '찜했어요.',
  읽는중: '읽었어요.',
};

export const STATUS_OBJECT: Record<'다읽음' | '읽기전' | '읽는중', string> = {
  다읽음: '다 읽고서 남긴',
  읽는중: '읽는중에 남긴',
  읽기전: '읽기전에 남긴',
};

export const COMMENT_HASHTAG_LOADER_SIZES: string[] = [
  '2rem',
  '4rem',
  '3rem',
  '6rem',
  '3rem',
  '4rem',
  '6rem',
  '2rem',
  '6rem',
  '8rem',
  '2rem',
  '4rem',
  '3rem',
  '2rem',
  '4rem',
  '3rem',
  '6rem',
  '3rem',
  '4rem',
  '6rem',
  '2rem',
  '6rem',
  '8rem',
  '2rem',
  '4rem',
  '3rem',
  '2rem',
  '4rem',
  '3rem',
  '6rem',
  '3rem',
  '4rem',
  '6rem',
  '2rem',
  '6rem',
  '8rem',
  '2rem',
  '4rem',
  '3rem',
];
