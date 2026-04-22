import { useState, useEffect } from "react";

export default function useProducts() {
  const STORAGE_KEY = 'app_products_data';
  
  const [productData, setProductData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(!productData);

  useEffect(() => { 
    if (productData) {
      return;
    }

    fetch('https://dummyjson.com/products?limit=200')
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("server error");
      }
      return response.json();
    })
    .then((response) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(response.products));
      setProductData(response.products)
    })
    .catch((error) => setError(error))
    .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { productData, error, loading };
};