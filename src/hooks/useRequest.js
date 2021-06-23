import { useState, useEffect } from "react";

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const request = async (url) => {
    try {
      setLoading(true)
      const response = await fetch(url)
      const result = await response.json()

      setLoading(false)
      return result
    } catch (e) {}
  }

  return {
    loading,
    request,
  }
}