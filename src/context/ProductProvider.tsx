import { useState, useEffect, ReactNode, useCallback, useRef } from "react";
import { fetchCategories, fetchProducts } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";
import { ProductContext } from "./ProductContext";
import { Category, Product } from "../types";

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [skip, setSkip] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const debouncedCategory = useDebounce(selectedCategory, 200);

  const handleSearchQueryChange = (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    setSkip(0);
  };

  const handleCategoryChange = (category: string) => {
    setLoading(true);
    setSelectedCategory(category);
    setSkip(0);
  };

  useEffect(() => {
    const loadCategories = async () => {
      const allCategories = await fetchCategories();
      setCategories(allCategories);
    };

    const loadInitialProducts = async () => {
      const initialProducts = await fetchProducts();
      setProducts(initialProducts);
    };
    
    loadCategories();
    loadInitialProducts();
  }, []);

  // Could implement a cache but for the sake of simplicity, we'll just fetch the data again.
  const loadProducts = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
  
    const newProducts = await fetchProducts(limit, skip, debouncedSearchQuery, debouncedCategory);

    if (newProducts.length < limit) {
      setHasMore(false);
    }

    if (skip > 0) {
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setProducts(newProducts);
    }

    loadingRef.current = false;
    setLoading(false);
    setInitialLoading(false);
  }, [limit, skip, debouncedSearchQuery, debouncedCategory]);
  
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!hasMore || loading || !node) return;
  
      if (!observer.current) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setSkip((prev) => prev + limit);
          }
        });
      }
  
      observer.current.observe(node);
  
      return () => {
        if (observer.current) observer.current.disconnect();
      };
    },
    [hasMore, loading]
  );
  

  return (
    <ProductContext.Provider value={{ products, categories, loading, initialLoading, selectedCategory, searchQuery, handleCategoryChange, handleSearchQueryChange, lastProductRef }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;

