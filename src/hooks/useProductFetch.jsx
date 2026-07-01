import { useEffect, useState } from "react";

const useProductFetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://dummyjson.com/products?limit=100");
        if (!res.ok) {
          throw new Error("Failed to load products");
        }
        const json = await res.json();
        setData(json.products);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useProductFetch;
