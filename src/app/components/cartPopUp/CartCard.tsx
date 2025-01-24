import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { BsImage, BsTrash } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import Counter from "../counter/Counter";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { CartAxiosContext } from "../../../../useContexts/CartAxios";

export default function CartCard({ item }: any) {
  const { setAddedProd } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const {
    setLocalCartProdKeyData,
    localCartProdKeyData,
  } = useContext(CartAxiosContext);

  // quantity

  const [quantityValue, setQuantityValue] = useState<number>(1);

  // quantity

  const handelDelete = (Id: number) => {
    
      let updatedItemsJson = localCartProdKeyData.filter(
        (items: any) => items.id != Id
      );
      localStorage.setItem(
        "BrandShopCartData",
        JSON.stringify(updatedItemsJson)
      );
      setLocalCartProdKeyData(updatedItemsJson);
      setAddedProd(false);
  };

  const hasImages = item.imgs_color.length === 0;

  const imageSource = item.imgs_color.find((color: any) => color.id === item.addedColorsId)
        ?.photos[0].url;

  return (
    <div className="flex max-md:flex-col items-center gap-[5px] shadow-md rounded-[10px] p-[10px] border-[1px] ">
      <div
        onClick={() => {
          handelDelete(item.addedColorsId);
        }}
        className="w-[40px]  flex items-center justify-center cursor-pointer text-[20px] hover:text-[24px] duration-100 hover:text-[red] max-lg:text-[red] max-lg:h-[40px]"
      >
        <BsTrash />
      </div>
      <div className="w-[calc(100%-50%-40px)] max-md:w-full flex  gap-[5px] max-md:flex-col items-center ">
        <div className="w-[100px] h-[100px] bg-white rounded-[10px]">
          {hasImages ? (
            <div className="w-full h-full  max-xl:h-[100px] max-tiny:h-[70px] rounded-[10px] bg-[#010125] text-white flex flex-col gap-y-[10px] items-center justify-center">
              <BsImage className="text-[20px]" />
              <p className="text-[12px] text-center">ფოტოები არ მოიძებნა</p>
            </div>
          ) : (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${imageSource}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "10px",
              }}
              width={100}
              height={100}
              className="w-full h-full object-contain"
              alt=""
            />
          )}
        </div>
        <div className="flex w-[calc(100%-105px)] max-md:w-full justify-center">
          <p className="line-clamp-2 text-center">
            {item.name}
          </p>
        </div>
      </div>
      <div className="w-[15%] max-md:w-full flex items-center gap-[10px] justify-center">
        <p className="hidden max-md:flex">ფასი:</p>
        <div className="flex items-end gap-[5px]">
          <h1 className="text-[20px] h-[27px]">
            {item.discount_price
              ? item.discount_price
              : item.price}
            ₾
          </h1>

          {item.discount_price && (
                <h1 className="text-[14px] line-through text-[red] ">
                  ₾{item.discount_price ? item.price : item.discount_price}
                </h1>
              )}
        </div>
      </div>

      <h1 className="w-[20%] max-md:w-full flex  justify-center">
        <Counter
          setQuantityValue={setQuantityValue}
          itemId={item.addedColorsId}
          itemQuantity={item.imgs_color.find(
                  (color: any) => color.id === item.addedColorsId
                )?.quantity
          }
        />
      </h1>
      <h1 className="w-[15%] max-md:w-full flex  justify-center">
        <p className="hidden max-md:flex">ჯამი: </p>
        {item.discount_price
          ? item.discount_price * quantityValue
          : item.price * quantityValue}
        ₾
      </h1>
    </div>
  );
}
