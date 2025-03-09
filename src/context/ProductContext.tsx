import { createContext } from "react";
import { Category, Product } from "../types";

interface ProductContextType {
  products: Product[];
  categories: Category[];
  loading: boolean;
  initialLoading: boolean;
  selectedCategory: string;
  searchQuery: string;
  handleCategoryChange: (category: string) => void;
  handleSearchQueryChange: (query: string) => void;
  lastProductRef: (node: HTMLDivElement | null) => void;
}

export const ProductContext = createContext<ProductContextType | undefined>(undefined);