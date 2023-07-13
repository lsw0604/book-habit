import { useState } from 'react';

export default function useStarHook() {
  const [star, setStar] = useState(0);
  const [hovering, setHovering] = useState(0);

  return { star, setStar, hovering, setHovering };
}
