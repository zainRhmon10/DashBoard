import { useCallback, useEffect, useState } from "react"
import { getAllZones } from "../services/zone";

export const UseZones = (token) =>{
    const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteLocal = (id) =>
    setRows((prev) => prev.filter((r) => r.id !== id));

   const fetchZones = useCallback(async () => {
      try {
        setLoading(true);
        const data = await getAllZones(token);
        setRows(data);
      } catch (err) {
        setError(err);
        console.error("Failed to fetch attributes:", err);
      } finally {
        setLoading(false);
      }
    }, [token]);
  
    useEffect(() => {
      if (token) fetchZones();
    }, [token, fetchZones]);
  
    return { rows, loading, error, deleteLocal, refresh: fetchZones};
  
}