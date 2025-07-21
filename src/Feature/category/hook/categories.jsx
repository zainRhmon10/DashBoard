import { useEffect, useState, useCallback, use } from "react";
import { getAllCategories ,getDetailesGategory} from "../services/category";

export const useCategories = (token) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteLocal = (id) =>
    setRows((prev) => prev.filter((r) => r.id !== id));

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllCategories(token);
      setRows(data);
    } catch (err) {
      setError(err);
      console.error("Failed to fetch attributes:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchCategories();
  }, [token, fetchCategories]);

  return { rows, loading, error, deleteLocal, refresh: fetchCategories };
};





export const useCategoryDetails = (token, id) => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !id) return;
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await getDetailesGategory(token, id);
        setCategory(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory() ;
  }, [token, id]);

  return { category, loading, error };

};





