"use client";

import React, { useContext, useEffect, useState } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { BsCart2, BsXLg } from "react-icons/bs";
import { BiSolidDirections } from "react-icons/bi";
import { IoIosArrowBack } from "react-icons/io";
import { VscCreditCard } from "react-icons/vsc";
import Calculator from "../CalculatorCart/CalcultorCart";
import { CartAxiosContext } from "../../../../useContexts/CartAxios";
import Loader1 from "../loaders/loader1";
import Link from "next/link";
import MyInput from "../myinput";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { UserContext } from "../../../../useContexts/UserAxios";
import CartCard from "./CartCard";
import { useRouter } from "next/navigation";

export default function CartPopUp() {
  const { openCart, setOpenCart, setAlertText, setShowAlert, setAlertstatus } =
    useContext(AxiosForSharingStatesAxiosContext);

  const {
    lastPrice,
    isLoaderCart,
    localCartProdData,
    localCartProdKeyData,
    setLocalCartProdKeyData,
  } = useContext(CartAxiosContext);
  const router = useRouter();

  const [allValues, setAllValues] = useState({
    city: "",
    country: "",
    comment: "",
    name: "",
    phone: "",
    street: "",
  });

  const [checkout, setCheckout] = useState(false);
  const [isError, setIsError] = useState(false);
  const [addressType, setAddressType] = useState("card");
  const [isLoaderAddOrders, setIsLoaderAddOrders] = useState<boolean>(false);

  const handleAddOrder = async (e: any) => {
    e.preventDefault();
    if (
      ![undefined, ""].includes(allValues.city) &&
      ![undefined, ""].includes(allValues.country) &&
      ![undefined, ""].includes(allValues.comment) &&
      ![undefined, ""].includes(allValues.name) &&
      ![undefined, ""].includes(allValues.phone) &&
      ![undefined, ""].includes(allValues.street)
    ) {
      setIsLoaderAddOrders(true);
      const form = e.target;
      const formData = new FormData(form);

      formData.append("orderItems", JSON.stringify(localCartProdKeyData));
      formData.append("delivery_cost", "0");
      formData.append("payment_method", addressType);

      axiosClient
        .post("front/order", formData)
        .then((res) => {
          setShowAlert(true);
          setAlertstatus(true);
          setAlertText("შეკვეთა წარმატებით შესრულდა");
          router.push("/");
          localStorage.setItem("BrandShopCartData", JSON.stringify([]));
          setLocalCartProdKeyData([]);
        })
        .catch((error) => {
          setShowAlert(true);

          if (
            error.response.data.message === "product quantity is not enough"
          ) {
            setAlertText(
              "საჭირო რაოდენობის პროდუქტი ამჟამად არ არსებობს, ამიტომ შეკვეთა ვერ შესრულდა"
            );
            setAlertstatus(false);
          } else {
            setAlertText("შეკვეთა წარმატებით შესრულდა");

            setAlertstatus(true);
            router.push("/");
            localStorage.setItem("BrandShopCartData", JSON.stringify([]));
            setLocalCartProdKeyData([]);
          }
        })
        .finally(() => {
          setIsLoaderAddOrders(false);
          setOpenCart(false);
          setCheckout(false);
        });
      setTimeout(() => {
        setShowAlert(false);
      }, 4000);
    } else {
      setIsError(true);
    }
  };

  return (
    <div
      className={` ${
        openCart ? "fixed" : "hidden"
      } z-10 top-0 left-0 w-full h-full bg-[#0000005d] flex items-center justify-center`}
    >
      <div className="bg-white w-[75%] max-sm:w-[90%] h-[75%] max-md:h-[85%] rounded-[20px]">
        <div className="py-[10px] px-[16px] border-b-[1px] flex items-center justify-between">
          <h1 className="select-none">{checkout ? "შეკვეთა" : "კალათა"}</h1>
          <div
            onClick={() => {
              setOpenCart(false);
              setCheckout(false);
            }}
            className="w-[40px] h-[40px] flex items-center justify-center text-[20px] cursor-pointer hover:bg-[black] rounded-full hover:text-white duration-150"
          >
            <BsXLg />
          </div>
        </div>
        {isLoaderCart ? (
          <div className="py-[100px]">
            <Loader1 />
          </div>
        ) : localCartProdData?.length === 0 ? (
          <div className="flex justify-center flex-col items-center py-[60px] h-[calc(100%-60px)] rounded-b-[20px] ">
            <div className="bg-white w-[140px] h-[140px] rounded-[10px] shadow-md border-[1px] flex justify-center items-center">
              <BsCart2 className="text-[40px] text-gray-500" />
            </div>
            <p className="pt-[20px] pb-[30px] font-semibold text-gray-500">
              კალათა ცარიელია
            </p>
            <Link href="/">
              <p
                onClick={() => {
                  setOpenCart(false);
                  setCheckout(false);
                }}
                className="bg-[black] hover:bg-gray-600 duration-200 text-white font-medium px-[20px] pt-[10px] pb-[8px] rounded-[30px] cursor-pointer"
              >
                დაამატე სამოსი კალათში
              </p>
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handleAddOrder}
            className="py-[10px] px-[16px] flex gap-[20px] h-[calc(100%-70px)] max-lg:flex-col overflow-y-scroll notshowScrollVert"
          >
            {checkout ? (
              <div className="w-[70%] max-lg:w-full h-full flex flex-col gap-y-[10px]">
                <div
                  onClick={() => {
                    setCheckout(false);
                  }}
                  className="flex items-center h-[40px] cursor-pointer gap-[10px] hover:gap-[20px] duration-100 self-start"
                >
                  <IoIosArrowBack />
                  <p className="">კალათა</p>
                </div>
                <div className="overflow-y-scroll notshowScrollVert w-full flex flex-col items-center">
                  <div className="max-w-[600px] max-md:max-w-full flex flex-col gap-y-[30px]  h-full">
                    <div className="flex flex-col rounded-[5px]">
                      <p
                        className={`text-[14px] max-md:text-[12px] ${
                          isError ? "text-[red]  underline" : ""
                        }`}
                      >
                        შეავსე სრულად ველები: სახელი, გვარი, ტელეფონი!!
                      </p>
                      <div className="py-[20px] flex items-center justify-between w-full border-b-[1px] border-[gray]">
                        <div className="flex flex-col  text-[18px]">
                          <p>საკონტაქტო ინფორმაცია</p>
                        </div>
                      </div>
                      <div className="py-[20px] flex flex-col gap-y-[8px]">
                        <div className="grid grid-cols-2 gap-[20px]">
                          <MyInput
                            title="სახელი"
                            name="name"
                            setAllValues={setAllValues}
                          />
                          <MyInput
                            title="ინსტაგრამი"
                            name="comment"
                            setAllValues={setAllValues}
                          />
                        </div>
                        <MyInput
                          title="ტელეფონი"
                          name="phone"
                          setAllValues={setAllValues}
                          isNumber={true}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col rounded-[5px]">
                      <p
                        className={`text-[14px] max-md:text-[12px] ${
                          isError ? "text-[red] underline" : ""
                        }`}
                      >
                        შეავსე სრულად ველები: ქუჩა, ქალაქი, ქვეყანა!!
                      </p>
                      <div className="py-[20px] flex items-center justify-between w-full border-b-[1px] border-[gray]">
                        <div className="flex items-center gap-[20px]">
                          <BiSolidDirections className="text-[30px] text-[gray]" />
                          <div className="flex flex-col  text-[18px]">
                            <p>მისამართი</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-[20px] flex flex-col gap-y-[8px]">
                        <MyInput
                          title="ქუჩა"
                          name="street"
                          setAllValues={setAllValues}
                        />
                        <MyInput
                          title="დამატებითი აღწერა"
                          name="address_details"
                          setAllValues={undefined}
                        />
                        <div className="grid grid-cols-2 gap-[20px]">
                          <MyInput
                            title="ქალაქი"
                            name="city"
                            setAllValues={setAllValues}
                          />
                          <MyInput
                            title="ქვეყანა"
                            name="country"
                            setAllValues={setAllValues}
                          />
                        </div>
                        <div className="flex flex-col gap-y-[5px]">
                          <p>გადახდის ტიპი</p>
                          <div className="flex gap-[100px]">
                            <div
                              onClick={() => {
                                setAddressType("card");
                              }}
                              className="flex items-center gap-[5px] cursor-pointer"
                            >
                              <div
                                className={`w-[15px] h-[15px] rounded-full border-[1px] p-[3px] ${
                                  addressType === "card"
                                    ? "border-[red]"
                                    : "border-gray"
                                }`}
                              >
                                <div
                                  className={`w-full h-full rounded-full ${
                                    addressType === "card" && "bg-[red]"
                                  }`}
                                ></div>
                              </div>
                              <p>ბარათით</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-[70%] max-lg:w-full h-full max-md:h-auto">
                <div className="h-full flex flex-col gap-[10px]">
                  <div className="flex items-center gap-[10px] bg-gray-200 h-[45px] px-[10px] rounded-[10px] shadow-md max-md:hidden">
                    <div className="w-[40px]"></div>
                    <h1 className="w-[calc(100%-50%-40px)] flex justify-center">
                      სამოსი
                    </h1>
                    <h1 className="w-[15%] flex justify-center">ფასი</h1>
                    <h1 className="w-[20%] flex justify-center">რაოდენობა</h1>
                    <h1 className="w-[15%] flex justify-center">ჯამი</h1>
                  </div>

                  <div className=" h-[calc(100%-45px)] max-md:h-auto rounded-[15px] flex flex-col gap-[10px]">
                    {localCartProdData?.map((item: any) => (
                      <CartCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div className="w-[30%] max-lg:w-full">
              <Calculator
                setCheckout={setCheckout}
                checkout={checkout}
                lastPrice={lastPrice}
                isLoaderAddOrders={isLoaderAddOrders}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
