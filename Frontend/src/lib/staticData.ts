import { RadioGroupOptionType } from 'types/style';

export const ageList = Array.from(Array(99), (_, i) => Number(i + 1));

export const ratingList: Record<number, string> = {
  1: '😞 그렇게 추천하지는 않아요.',
  2: '😕 조심스럽게 추천해요.',
  3: '😐 나쁘지 않게 추천해요.',
  4: '😃 취향을 타지 않는다면 추천해요.',
  5: '🌟 말이 더 필요할 정도인가요?',
};

export const readToBookOptions: RadioGroupOptionType<number>[] = [
  {
    label: '😞 그렇게 기대하지는 않아요.',
    value: 1,
    description: '1 ~ 5 사이 점수르 매긴다면 1 정도에요.',
  },
  {
    label: '😕 조심스럽게 기대해요.',
    value: 2,
    description: '1 ~ 5 사이 점수르 매긴다면 2 정도에요.',
  },
  {
    label: '😐 나쁘지 않게 기대해요.',
    value: 3,
    description: '1 ~ 5 사이 점수르 매긴다면 3 정도에요.',
  },
  {
    label: '😃 취향을 타지 않아서 기대해요.',
    value: 4,
    description: '1 ~ 5 사이 점수르 매긴다면 4 정도에요.',
  },
  {
    label: '🌟 말이 더 필요할 정도인가요?',
    value: 5,
    description: '1 ~ 5 사이 점수르 매긴다면 5 정도에요.',
  },
];
