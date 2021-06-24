import { useState } from 'react';

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState('');

  const request = async(url) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();

      setLoading(false);

      return result;
    } catch (e) {
      throw new Error(e);
    }
  };

  // eslint-disable-next-line consistent-return
  const post = async(url, data) => {
    try {
      if (!loading) {
        setLoading(true);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(data),
        });

        setLoading(false);

        const result = await response.json();

        setLoading(false);

        return result;
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  // eslint-disable-next-line consistent-return
  const del = async(url, id) => {
    try {
      if (!loading) {
        setLoading(true);
        const response = await fetch(`${url}/${id}`, {
          method: 'DELETE',
        });

        const result = await response.json();

        setLoading(false);

        return result;
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  // eslint-disable-next-line consistent-return
  const put = async(url, id, data) => {
    try {
      if (!loading) {
        setLoading(true);
        const response = await fetch(`${url}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();

        setLoading(false);

        return result;
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  return {
    loading,
    request,
    post,
    del,
    put,
  };
};
