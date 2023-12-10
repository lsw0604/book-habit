import { useState } from 'react';

export default function useCommentsPageHook() {
  const [filter, setFilter] = useState<string[]>([]);

  const addFilter = (tag: string) => {
    if (!filter.includes(tag)) {
      setFilter((prev) => [...prev, tag]);
    }
  };

  const removeFilter = (tag: string) => {
    if (filter.includes(tag)) {
      setFilter((prev) => prev.filter((v) => v !== tag));
    }
  };
  return {
    addFilter,
    removeFilter,
    filter,
  };
}
