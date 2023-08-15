export const ageList = Array.from(Array(99), (_, i) => Number(i + 1));

export const ratingList: Record<number, string> = {
  1: '😞 그렇게 추천하지는 않아요.',
  2: '😕 조심스럽게 추천해요.',
  3: '😐 나쁘지 않게 추천해요.',
  4: '😃 취향을 타지 않는다면 추천해요.',
  5: '🌟 말이 더 필요할 정도인가요?',
};
