import { useEffect, useState, useCallback, use } from "react";
import { fetchAllTags, getDetailsTag } from "../services/api";

export const useTags = (token) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteLocal = (id) =>
    setRows((prev) => prev.filter((r) => r.id !== id));

  const fetchtags = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchAllTags(token);
      setRows(data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch attributes:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchtags();
  }, [token, fetchtags]);

  return { rows, loading, error, deleteLocal, refresh: fetchtags };
};





export const useTagDetails = (token, id) => {
  const [Tag, setTag] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !id) return;
    const fetchTag = async () => {
      try {
        setLoading(true);
        const data = await getDetailsTag(token, id);
        setTag(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTag() ;
  }, [token, id]);

  return { Tag, loading, error };

};





