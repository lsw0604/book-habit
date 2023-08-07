import { useState } from 'react';

export default function useStarHook() {
  const [star, setStar] = useState(0);

  return { star, setStar };
}
