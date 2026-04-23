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
    if (productData) return;

    const controller = new AbortController();
    fetch('https://dummyjson.com/products?limit=200', { signal: controller.signal })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error("server error");
      }
      return response.json();
    })
    .then((response) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(response.products));
      setProductData(response.products);
      setLoading(false);
    })
    .catch((error) => {
      if (error.name === 'AbortError') return;
      setError(error);
    });

    return () => controller.abort();
    
  }, [productData]);

  return { productData, error, loading };
};