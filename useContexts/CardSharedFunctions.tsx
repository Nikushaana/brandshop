"use client";

import { useContext, useState, useEffect } from "react";
import { CartAxiosContext } from "./CartAxios";
import { AxiosForSharingStatesAxiosContext } from "./sharedStates";
import axiosClient from "./AxiosClient/AxiosClient";

export function useSharedCardLogic(item: any) {
  const {
    localCartProdData,
    setLocalCartProdData,
  } = useContext(CartAxiosContext);

  const { setShowAlert, setAlertstatus, setAlertText } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const [addedProd, setAddedProd] = useState(false);

  const handleAddToCart = () => {
    setAddedProd(true);

    setShowAlert(true);
    setAlertstatus(true)
    setAlertText("სამოსი დაემატა კალათში");

    
      setLocalCartProdData([
        ...localCartProdData,
        { id: item.id, quantity: 1 },
      ]);
      localStorage.setItem(
        "InnovateonCartData",
        JSON.stringify(localCartProdData)
      );
    

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return {
    addedProd,
    handleAddToCart,
    setAddedProd,
  };
}
