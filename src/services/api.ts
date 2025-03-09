import axios from "axios";
import { Category, Product } from "../types";

const BASE_URL = "https://dummyjson.com";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(`${BASE_URL}/products/categories`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const fetchProducts = async (limit: number = 20, skip: number = 0, query: string = '', category: string = ''): Promise<Product[]> => {
  try {
    let url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;

    if (query) {
      url = `${BASE_URL}/products/search?q=${query}&limit=${limit}&skip=${skip}`;
    } else if (category) {
      url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
    }

    const response = await axios.get<{ products: Product[] }>(url);
    let products = response.data.products;

    // DummyJSON does not support filtering by both query and category, so we do it manually.
    if (query && category) {
      products = products.filter((product) => product.category === category);
    }

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};