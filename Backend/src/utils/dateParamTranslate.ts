export default function dateParamTranslate(ctx: number): string {
  const stringify = ctx.toString();

  const year = parseInt(stringify.slice(0, 4));
  const month = parseInt(stringify.slice(4, 6));
  const day = parseInt(stringify.slice(6, 8));
  return `${year}년 0${month}월 ${day - 1}일`;
}
