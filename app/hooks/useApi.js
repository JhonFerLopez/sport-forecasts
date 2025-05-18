import { useCallback, useEffect, useState } from 'react';

export const useApi = (apiFunction, initialParams = null, loadOnMount = true) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (params = initialParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await apiFunction(params);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction, initialParams]);

  useEffect(() => {
    if (loadOnMount) {
      execute();
    }
  }, [execute, loadOnMount]);

  return { data, isLoading, error, execute, setData };
};