import { createContext, ReactNode, useContext, useState } from "react";
import api from "../services/api";

interface ProductsProviderProps {
  children: ReactNode;
}

interface Feature {
  id: number;
  brand: string;
  model: string;
  weight: number;
  productId: number;
  userId: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  features: Feature[];
  userId: number;
}

interface ProductsContextData {
  products: Product[];
  listProducts: () => void;
}

export const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const listProducts = () => {
    api
      .get<Product[]>("/products?_embed=features")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <ProductsContext.Provider value={{ listProducts, products }}>
      {children}
    </ProductsContext.Provider>
  );
};
