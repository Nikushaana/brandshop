"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ProductsAxiosContext } from "./ProductsAxios";
import axiosClient from "./AxiosClient/AxiosClient";
import { AxiosForSharingStatesAxiosContext } from "./sharedStates";

export const CartAxiosContext = createContext<any>(null);

const CartContext = ({ children }: any) => {
  const { ProdData } = useContext(ProductsAxiosContext);
  const [checkAddress, setCheckAddress] = useState<boolean>(true);
  const [isLoaderCart, setIsLoaderCart] = useState<boolean>(true);
  const [newRenderCart, setNewRenderCart] = useState(null);
  const [cartData, setCartData] = useState<any | []>([]);
  const [localCartProdKeyData, setLocalCartProdKeyData] = useState<any | []>(
    []
  );
  const [localCartProdData, setLocalCartProdData] = useState<any | []>([]);
  const [lastPrice, setLastPrice] = useState<number>(0);

  useEffect(() => {
      let multipled = 0;
      localCartProdData.map((item: any) => {
        multipled += item.discount_price
          ? item.discount_price * item.addedColorsQuantity
          : item.price * item.addedColorsQuantity;
      });
      setLastPrice(multipled);
    
  }, [localCartProdData]);

  useEffect(() => {
    const findMatchingProducts = (localCartProduct: any) => {
      const { id } = localCartProduct;
      return ProdData.filter((product: any) =>
        product.imgs_color.some((imgColor: any) => imgColor.id === id)
      );
    };

    const matchedProducts = localCartProdKeyData.flatMap(
      (localCartProduct: any) => {
        const matchingProducts = findMatchingProducts(localCartProduct);
        return matchingProducts.map((product: any) => ({
          ...product,
          addedColorsId: localCartProduct.id,
          addedColorsQuantity: localCartProduct.quantity,
        }));
      }
    );

    setLocalCartProdData(matchedProducts);
  }, [localCartProdKeyData, ProdData]);

  useEffect(() => {
    const storedData = localStorage.getItem("BrandShopCartData");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setLocalCartProdKeyData(parsedData);
    setIsLoaderCart(false);
  }, []);

  return (
    <CartAxiosContext.Provider
      value={{
        cartData,
        setCartData,
        newRenderCart,
        setNewRenderCart,
        lastPrice,
        checkAddress,
        setCheckAddress,
        isLoaderCart,
        setIsLoaderCart,
        localCartProdKeyData,
        setLocalCartProdKeyData,
        localCartProdData,
      }}
    >
      {children}
    </CartAxiosContext.Provider>
  );
};

export default CartContext;
