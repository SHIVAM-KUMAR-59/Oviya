import { useState, useCallback } from 'react';
import api, { getErrorMessage } from '@/lib/utils/api.util';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (message: string) => void;
}

interface UseApiReturn<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (url: string, body?: unknown) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = unknown>(
  method: Method,
  options: UseApiOptions<T> = {},
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (url: string, body?: unknown): Promise<T | null> => {
      setLoading(true);
      setError(null);

      try {
        const response =
          method === 'get' || method === 'delete'
            ? await api[method]<T>(url)
            : await api[method]<T>(url, body);

        const result = response.data;
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const message = getErrorMessage(err) ?? 'Something went wrong. Please try again.';
        setError(message);
        options.onError?.(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [method, options.onSuccess, options.onError],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
}
