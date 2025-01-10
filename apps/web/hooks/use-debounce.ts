import { useState, useEffect } from "react";

interface useDebouncedSearchProps {
  onSearch?: (query: string) => void;
  debounceTime?: number;
  query: string;
}

const useDebouncedSearch = ({ query, onSearch, debounceTime = 300 }: useDebouncedSearchProps) => {
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [query, debounceTime]);

  useEffect(() => {
    if (debouncedQuery) {
      onSearch?.(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);
}

export default useDebouncedSearch;