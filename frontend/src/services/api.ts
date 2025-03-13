import axios from "axios";
import { Category, Product } from "../types";

const API_BASE_URL = "http://localhost:8080/api";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchProducts = async (limit: number = 20, page: number = 0, searchQuery?: string, category?: string): Promise<{ content: Product[] }> => {
  try {
    const params = {
      page,
      limit,
      searchQuery: searchQuery && searchQuery.trim() !== "" ? searchQuery : null,
      category: category && category.trim() !== "" ? category : null,
    };

    const response = await axios.get(`${API_BASE_URL}/products`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};