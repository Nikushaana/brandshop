"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  BsArrowRight,
  BsCalendar,
  BsCart,
  BsCart2,
  BsHeart,
  BsHeartFill,
  BsPersonArmsUp,
  BsShieldCheck,
  BsShop,
  BsTrash2,
  BsTruck,
} from "react-icons/bs";
import { FaApplePay, FaGooglePay } from "react-icons/fa";
import { GrAmex } from "react-icons/gr";
import { RiExchangeDollarFill, RiVisaLine } from "react-icons/ri";
import { SiAmazonpay } from "react-icons/si";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineTruck } from "react-icons/hi2";
import { TbTruckReturn } from "react-icons/tb";
import { CiGlobe } from "react-icons/ci";
import ProdInSlider2 from "./sliderproductinimgs";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { CartAxiosContext } from "../../../../useContexts/CartAxios";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import Image from "next/image";
import { BiHandicap } from "react-icons/bi";
import Counter from "../counter/Counter";
import Loader1 from "../loaders/loader1";

export default function ProductContent2({ itemId }: any) {
  const {
    cartData,
    setNewRenderCart,
    localCartProdKeyData,
    setLocalCartProdKeyData,
  } = useContext(CartAxiosContext);

  const {
    setShowAlert,
    setAlertText,
    setAlertstatus,
    addedProd,
    setAddedProd,
  } = useContext(AxiosForSharingStatesAxiosContext);

  const [inEachProdData, setinEachProdData] = useState<any>();
  const [activeColor_imgs, setActiveColor_imgs] = useState<any>(0);
  const [colorId, setColorId] = useState<any>();

  useEffect(() => {
    setColorId(inEachProdData?.imgs_color[activeColor_imgs]?.id);
  }, [activeColor_imgs, inEachProdData?.imgs_color]);

  const [isLoaderEach, setIsLoaderEach] = useState<boolean>(true);

  // useEffect(() => {
  //   setIsLoaderEach(true);
  //   axiosClient
  //     .get(`front/product/${itemId}`)
  //     .then((res) => {
  //       setinEachProdData(res.data);
  //       setIsLoaderEach(false);
  //     })
  //     .catch((error) => {})
  //     .finally(() => {});
  // }, [itemId]);

  // quantity

  const [quantityValue, setQuantityValue] = useState<number>(1);

  // quantity

  const handleAddToCart = () => {
    setAddedProd(true);
    setShowAlert(true);
    setAlertstatus(true);
    setAlertText("სამოსი კალათაში დაემატა");

    setLocalCartProdKeyData((prev: any) => [
      ...prev,
      { id: colorId, quantity: quantityValue },
    ]);
    localStorage.setItem(
      "BrandShopCartData",
      JSON.stringify([
        ...localCartProdKeyData,
        { id: colorId, quantity: quantityValue },
      ])
    );

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  // useEffect(() => {
  //   if (localCartProdKeyData.find((itemdd: any) => itemdd.id == colorId)) {
  //     setAddedProd(true);
  //   } else {
  //     setAddedProd(false);
  //   }
  // }, [cartData, colorId, localCartProdKeyData, setAddedProd]);

  return (
    <div className="flex flex-col gap-y-[70px] ">
      {/* {isLoaderEach ? (
        <div className="w-full h-[620px] max-md:h-[400px] max-lg:w-full flex items-center justify-center">
          <div className="flex flex-col gap-y-[10px]">
            <Loader1 />
            <p>იტვირთება..</p>
          </div>
        </div>
      ) : ( */}
        <div className="w-[100%] gap-[40px] flex justify-between max-lg:flex-col">
          <div className="w-[50%] h-[620px] max-md:h-[400px] max-lg:w-full">
            <ProdInSlider2
              // inEachProdData={inEachProdData}
              // activeColor_imgs={activeColor_imgs}
            />
          </div>

          <div className="w-[50%] max-lg:w-full flex flex-col gap-[20px] ">
            <div className="flex flex-col gap-y-[30px] max-lg:gap-y-[10px]">
              <h1 className="text-[24px] font-semibold">
                {/* {inEachProdData?.name} */}
                მოსაცმელი
              </h1>
              <div className="flex items-center gap-[20px]">
                <div className="flex items-end gap-[5px]">
                  <h1 className="text-[30px] h-[39px]">
                    ₾80
                    {/* {inEachProdData?.discount_price
                      ? inEachProdData?.discount_price
                      : inEachProdData?.price} */}
                  </h1>
                  {/* {inEachProdData?.discount_price && ( */}
                    <h1 className="text-[16px] line-through text-[red] ">
                      ₾150
                      {/* {inEachProdData?.discount_price
                        ? inEachProdData?.price
                        : inEachProdData?.discount_price} */}
                    </h1>
                  {/* )} */}
                </div>

                {/* {inEachProdData?.discount_percent && ( */}
                  <div className="bg-[red] shadow text-white h-[30px] px-[10px] text-[14px] flex items-center rounded-[3px]">
                    {/* -{inEachProdData?.discount_percent}% */}-25%
                  </div>
                {/* )} */}
              </div>

              <div className="flex flex-col gap-[10px]">
                <p>ფერი: ყავისფერი</p>
                <div className="flex items-center gap-[10px]">
                  {/* {inEachProdData?.imgs_color.map((item1: any, index: any) => (
                    <div
                      key={item1.id}
                      className={` rounded-full duration-100 w-[45px] h-[25px] shadow ${
                        activeColor_imgs === index
                          ? " border-slate-700 p-[2px] border-[3px]"
                          : " border-[gray] shadow hover:p-[2px] hover:border-[#010125]"
                      }`}
                    >
                      <div
                        onClick={() => {
                          setActiveColor_imgs(index);
                          setColorId(item1.id);
                        }}
                        className={`${item1.color_code} w-full h-full flex items-center justify-center rounded-full cursor-pointer `}
                      ></div>
                    </div>
                  ))} */}
                </div>
              </div>
              <p className="line-clamp-1 text-[14px] text-gray-500">
                ზომა: 42
                {/* {inEachProdData?.product_sizes} */}
              </p>

              <div className="flex flex-col gap-[20px]">
                <Counter
                  setQuantityValue={setQuantityValue}
                  itemId={inEachProdData?.imgs_color[activeColor_imgs]?.id}
                  itemQuantity={
                    inEachProdData?.imgs_color[activeColor_imgs]?.quantity
                  }
                />
                <div className="flex items-center gap-[20px]">
                  <div
                    onClick={handleAddToCart}
                    className={`flex items-center justify-between rounded-[30px] h-[50px] pl-[20px] pr-[10px] w-[180px] max-tiny:w-full duration-100 gap-[10px] font-semibold ${
                      addedProd
                        ? "bg-black text-white pointer-events-none"
                        : "bg-gray-200 cursor-pointer  "
                    }`}
                  >
                    {addedProd ? (
                      <p>კალათაშია</p>
                    ) : (
                      <>
                        <BsCart2 />
                        <p>დამატება</p>
                      </>
                    )}
                    <div
                      className={`w-[50px] bg-white px-[5px] py-[5px] rounded-[30px]  duration-200 `}
                    >
                      <div
                        className={`w-[20px] h-[20px] rounded-full bg-black duration-200 ${
                          addedProd ? "ml-[20px]" : "ml-[0px]"
                        }`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* )} */}

      {/* {!isLoaderEach && ( */}
        <div className="flex flex-col gap-y-[10px]">
          <h1>პროდუქტის აღწერა</h1>
          <p>
            პროდუქტს მოგაწვდით შეძენიდან 2 კვირაში
            {/* {inEachProdData?.description} */}
            </p>
        </div>
      {/* )} */}
    </div>
  );
}
