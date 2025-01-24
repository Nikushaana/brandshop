"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Loader1 from "@/app/components/loaders/loader1";
import axiosClient from "../../../../../useContexts/AxiosClient/AxiosClient";
import { AxiosForSharingStatesAxiosContext } from "../../../../../useContexts/sharedStates";

export default function Page({ params }: { params: { productId: string } }) {
  const { setStatusPopUp, setStatusPopUpData, renderEachOrder } = useContext(
    AxiosForSharingStatesAxiosContext
  );
  const [eachOrderData, setEachOrderData] = useState<any>();
  const [isLoaderEachOrders, setIsLoaderEachOrders] = useState<boolean>(true);

  useEffect(() => {
    setIsLoaderEachOrders(true);
    axiosClient
      .get(`admin/order/${params.productId}`)
      .then((res) => {
        setEachOrderData(res.data);
        setIsLoaderEachOrders(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [params.productId, renderEachOrder]);

  return (
    <div>
      {isLoaderEachOrders ? (
        <div>
          <Loader1 />
        </div>
      ) : (
        <div className="flex flex-col gap-y-[10px]">
          <div className="flex items-center justify-between">
            <p className="text-[20px]  max-lg:ml-[60px]">
              შეკვეთის ID:{eachOrderData?.id}
            </p>
            <Link href={`/adminPanel/orders`}>
              <p className="bg-[#010125] text-white px-[10px] h-[40px] flex items-center rounded-[10px] cursor-pointer duration-100 hover:bg-[#01012596] hover:scale-105">
                უკან დაბრუნება
              </p>
            </Link>
          </div>
          <div>
            <h1 className="text-[20px]">შეკვეთილი სამოსი</h1>
            <div className="overflow-x-scroll notShowScroll w-full pt-[5px]">
              <div className={`gap-[20px] ml-[10px] flex`}>
                {eachOrderData?.ordersDetails.map((item: any) => (
                  <div key={item.id} className="flex flex-col gap-y-[5px]">
                    <div className="bg-[#EAF5FF] rounded-[10px] p-[10px] w-[200px] h-[200px] max-tiny:h-[150px] ">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.imgs_color.photos[0]?.url}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        width={500}
                        height={300}
                        alt=""
                      />
                    </div>

                    <p className="px-[15px] h-[30px] rounded-full self-start border-b-[2px] bg-gray-100 flex items-center">
                      ფერი: {item.imgs_color.color_name}
                    </p>
                    <p className="px-[15px] h-[30px] rounded-full self-start border-b-[2px] bg-gray-100 flex items-center">
                      რაოდენობა: {item.quantity} ცალი
                    </p>
                    <p className="px-[15px] h-[30px] rounded-full self-start border-b-[2px] bg-gray-100 flex items-center">
                      ფასი: {item.price * item.quantity} ლარი
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[20px]">მისამართი</h1>
            <p className="text-[15px] ml-[10px]">
              {eachOrderData?.street}, {eachOrderData?.city},{" "}
              {eachOrderData?.country}, {eachOrderData?.address_details}
            </p>
          </div>

          <div className="flex flex-col">
            <h1 className="text-[20px]">თარიღი</h1>
            <p className="text-[15px] ml-[10px]">
              {eachOrderData?.createdAt.split("T")[0].replace(/-/g, " ")}
            </p>
          </div>
          <div className="flex flex-col">
            <h1 className="text-[20px]">ღირებულება</h1>
            <p className="text-[15px] ml-[10px]">
              {eachOrderData?.total_price}₾
            </p>
          </div>

          <div className="flex flex-col">
            <h1 className="text-[20px]">საკონტაქტო ინფორმაცია</h1>
            <p className="text-[15px] ml-[10px]">
              დამკვეთი: {eachOrderData?.name}
            </p>
            <p className="text-[15px] ml-[10px]">
              ტელეფონის ნომერი: {eachOrderData?.phone}
            </p>
            <p className="text-[15px] ml-[10px]">
              ინსტაგრამი: {eachOrderData?.comment}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
