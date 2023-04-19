import { useEffect, useState } from 'react';

export default function useFetch(fetchFunction) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function fetchData() {
    setLoading(true);
    try {
      const fetchData = await fetchFunction();
      setData(fetchData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return [data, loading, error, fetchData];
}
