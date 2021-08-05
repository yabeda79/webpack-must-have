import { useState, useCallback } from "react";

type Headers = Record<string, string>;
// {
// "Content-type"?: string
// }

// eslint-disable-next-line import/prefer-default-export
export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async <T = any>(url: string, method = "GET", body: {} | null = null, headers: Headers = {}): Promise<T> => {
      setLoading(true);
      try {
        // if (body) {
        //   body = JSON.stringify(body);
        //   headers["Content-type"] = "application/json";
        // }

        const response = await fetch(`http://localhost:3000${url}`, {
          method,
          // body: body? ,
          ...(!!body && { body: JSON.stringify(body) }),
          headers: { ...headers, ...(!!body && { "Content-type": "application/json" }) },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setLoading(false);

        return data as T;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { loading, request, error, clearError };
};
