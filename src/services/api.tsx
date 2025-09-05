import axios from "axios";

export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

const api = axios.create({
  baseURL: "https://dummyjson.com",
});

export const getProducts = (limit = 12, skip = 0) =>
  api.get<{ products: Product[]; total: number; skip: number; limit: number }>(
    `/products?limit=${limit}&skip=${skip}`
  );

export const searchProducts = (query: string, limit = 12, skip = 0) =>
  api.get<{ products: Product[]; total: number; skip: number; limit: number }>(
    `/products/search?q=${query}&limit=${limit}&skip=${skip}`
  );

export const getProduct = (id: number) => api.get<Product>(`/products/${id}`);

export type Category = {
  slug: string;
  name: string;
  url: string;
};

export const getCategories = () => api.get<Category[]>("/products/categories");

export const getProductsByCategory = (category: string, limit = 12, skip = 0) =>
  api.get<{ products: Product[]; total: number; skip: number; limit: number }>(
    `/products/category/${category}?limit=${limit}&skip=${skip}`
  );
