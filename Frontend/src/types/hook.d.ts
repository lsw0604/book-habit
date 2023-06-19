import { IconType } from './style';

export type DynamicIcon<T extends IconType, K> = (icon: T) => {
  [P in keyof K]: K[P];
};
