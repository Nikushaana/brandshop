"use client";

import React, { useEffect, useState } from "react";
import Loader1 from "../loaders/loader1";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import OrderCard from "./orderCard";

export default function Orders() {
  const [newRenderOrder, setNewRenderOrder] = useState(null);
  const [orderData, setOrderata] = useState<any>([]);
  const [isLoaderOrders, setIsLoaderOrders] = useState<boolean>(true);

  useEffect(() => {
    setIsLoaderOrders(true);
    axiosClient
      .get("admin/order")
      .then((res) => {
        setOrderata(res.data.data);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoaderOrders(false);
      });
  }, [newRenderOrder]);

  return (
    <div className="flex flex-col gap-y-[20px]">
      <h1 className="text-[24px]  max-lg:ml-[60px] max-sm:text-[20px]">
        სულ {orderData.length ? orderData.length : 0} შეკვეთა
      </h1>
      <div>
        {isLoaderOrders ? (
          <div className="pt-[50px]">
            <Loader1 />
          </div>
        ) : (
          <div className="grid grid-cols-1  gap-[20px] max-tiny:gap-[16px]">
            {orderData?.map((item: any) => (
              <OrderCard
                key={item.id}
                item={item}
                setNewRenderOrder={setNewRenderOrder}
                setIsLoaderOrders={setIsLoaderOrders}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
