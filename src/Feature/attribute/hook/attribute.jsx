import { useEffect, useState ,useCallback} from 'react';
import { getAllAtributte } from '../services/attribute';

export const useAttributes = (token) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const deleteLocal = (id) =>
    setRows((prev) => prev.filter((r) => r.id !== id));


  const fetchAttributes = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllAtributte(token);
      setRows(data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch attributes:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchAttributes();
  }, [token, fetchAttributes]);

  return { rows, loading, error ,deleteLocal,refresh: fetchAttributes,};
};
