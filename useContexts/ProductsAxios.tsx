"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "./AxiosClient/AxiosClient";
import { AxiosForSharingStatesAxiosContext } from "./sharedStates";

export const ProductsAxiosContext = createContext<any>(null);

const ProductsContext = ({ children }: any) => {
  const [newRenderProducts, setNewRenderProducts] = useState(null);
  const [ProdData, setProdData] = useState<any>([]);
  const [ProductsLoader, setProductsLoader] = useState<boolean>(true);

  useEffect(() => {
    axiosClient
      .get("front/product")
      .then((res) => {
        setProdData(res.data.data);
        setProductsLoader(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [newRenderProducts]);

  return (
    <ProductsAxiosContext.Provider
      value={{
        ProdData,
        setNewRenderProducts,
        ProductsLoader,
      }}
    >
      {children}
    </ProductsAxiosContext.Provider>
  );
};

export default ProductsContext;
