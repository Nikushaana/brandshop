"use client";

import React, { useContext, useState } from "react";
import MyInput from "../myinput";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import Loader1 from "../loaders/loader1";

export default function ProductInfoCard({ item, eachProdData }: any) {
  const { setNewRenderProductsImgsandColor, loaderEachCardData,
    setLoaderEachCardData } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  

  const [allValues, setAllValues] = useState({
    quantity: "",
  });

  const handelDelete = (Id: any) => {
    setLoaderEachCardData(true);
    axiosClient
      .delete(`admin/productImage/${Id}`)
      .then((response) => {
        setNewRenderProductsImgsandColor(response);
      })
      .catch((error) => {})
      .finally(() => {});
  };
  const handelDeleteWholeColor = (Id: any) => {
    setLoaderEachCardData(true);
    axiosClient
      .delete(`admin/productColor/${Id}`)
      .then((response) => {
        setNewRenderProductsImgsandColor(response);
      })
      .catch((error) => {})
      .finally(() => {});
  };

  const UpdateProdQuantity = (id: any) => {
    setLoaderEachCardData(true);
    axiosClient
      .post(`admin/updateProductImageColors/${id}`, {
        quantity: allValues.quantity ? allValues.quantity : 0,
      })
      .then((response) => {
        setNewRenderProductsImgsandColor(response);
      })
      .catch((error) => {});
  };

  return (
    <div className="flex flex-col gap-y-[10px] shadow shadow-white p-[10px] rounded-[10px]">
      {loaderEachCardData ? (
        <div className="py-[10px]">
          <Loader1 />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center max-lg:flex-col-reverse max-lg:gap-y-[10px]">
            <p className="bg-white px-[10px] h-[30px] text-[14px] flex items-center self-start rounded-[5px]">
              {item.color_name}
            </p>
            <div
              className="rounded-full flex px-[20px] h-8 bg-[red] text-white max-md:flex cursor-pointer items-center justify-center"
              onClick={() => {
                handelDeleteWholeColor(item.id);
              }}
            >
              მთლიანი ფერის წაშლა
            </div>
          </div>
          <div className="flex items-end gap-[10px]">
            <div className="w-[200px] max-sm:w-full text-white">
              <MyInput
                name="quantity"
                firstValue={item.quantity}
                setAllValues={setAllValues}
                title={`${item.color_name}-ს მარაგი`}
                digit={true}
              />
            </div>
            <p
              onClick={(e) => {
                UpdateProdQuantity(item.id);
              }}
              className="px-[10px] h-[35px] rounded-[10px] flex items-center bg-[brown] text-white"
            >
              ჩასწორება
            </p>
          </div>
          <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 items-center">
            {item.photos.map((item1: any) => (
              <div
                key={item1.id}
                className="relative group flex items-center w-full h-[150px] rounded-[10px]"
              >
                <div className="flex items-center w-full h-full bg-[white] rounded-[9px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${item1.url}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                    width={500}
                    height={300}
                    alt=""
                  />
                </div>
                <div
                  className="rounded-full absolute group-hover:flex max-lg:flex top-[7px] right-[10px] w-8 h-8 bg-[red] max-md:flex cursor-pointer hidden items-center justify-center"
                  onClick={() => {
                    handelDelete(item1.id);
                  }}
                >
                  <AiOutlineClose className="text-gray-100 text-2xl" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
