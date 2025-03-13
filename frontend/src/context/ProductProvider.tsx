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
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const limit = 20;

  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const debouncedCategory = useDebounce(selectedCategory, 200);

  const handleSearchQueryChange = (query: string) => {
    console.log('query:', query)
    setLoading(true);
    setSearchQuery(query);
    setPage(0);
  };

  const handleCategoryChange = (category: string) => {
    console.log("categoryName:", category)
    setLoading(true);
    setSelectedCategory(category);
    setPage(0);
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const allCategories = await fetchCategories();
        console.log("initialCategories:", allCategories)
        setCategories(allCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };

    const loadInitialProducts = async () => {
      try {
        const initialProducts = await fetchProducts(limit, 0);
        console.log("initialProducts:", initialProducts)
        setProducts(initialProducts.content);
      } catch (error) {
        console.error("Error loading initial products:", error);
      }
    };
    
    loadCategories();
    loadInitialProducts();
  }, []);

  const loadProducts = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    try {
      const newProducts = await fetchProducts(limit, page, debouncedSearchQuery, debouncedCategory);
      if (newProducts.content.length < limit) {
        setHasMore(false);
      }

      if (page > 0) {
        setProducts((prev) => [...prev, ...newProducts.content]);
      } else {
        setProducts(newProducts.content);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setInitialLoading(false);
    }
  }, [limit, page, debouncedSearchQuery, debouncedCategory]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const lastProductRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!hasMore || loading || !node) return;
  
      if (!observer.current) {
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            setPage((prev) => prev + 1);
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

