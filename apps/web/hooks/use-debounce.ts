import { useState, useEffect, useTransition } from "react";

interface useDebouncedSearchProps {
  onSearch?: (query: string) => Promise<void>;
  debounceTime?: number;
  query: string;
}

const useDebouncedSearch = ({ query, onSearch, debounceTime = 300 }: useDebouncedSearchProps) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [loading, startLoading] = useTransition();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [query, debounceTime]);

  useEffect(() => {
    if (debouncedQuery) {
      startLoading(async () => await onSearch?.(debouncedQuery))
    }
  }, [debouncedQuery, onSearch]);

  return { loading, debouncedQuery };
}

export default useDebouncedSearch;