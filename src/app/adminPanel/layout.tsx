"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../useContexts/UserAxios";
import Image from "next/image";
import { AxiosForSharingStatesAxiosContext } from "../../../useContexts/sharedStates";
import { BsList, BsXLg } from "react-icons/bs";
import ScreenWidth from "../components/screenwidth";
import axiosClient from "../../../useContexts/AxiosClient/AxiosClient";
import { BiLoader } from "react-icons/bi";

export default function AdminPanel({ children }: any) {
  const { setTokenAdmin, setIsAuthorizedAdmin, setAdmin } =
    useContext(UserContext);

  const { isAuthorizedAdmin, openAdminMenuPopUp, setOpenAdminMenuPopUp } =
    useContext(AxiosForSharingStatesAxiosContext);

  const router = useRouter();

  const pathname = usePathname();

  const screenWidth = ScreenWidth();
  const [isLoaderLogOut, setIsLoaderLogOut] = useState<boolean>(false);
  const logOut = () => {
    setIsLoaderLogOut(true);
    axiosClient
      .get("adminAuth/logOut")
      .then((res) => {
        setIsAuthorizedAdmin(false);
        setAdmin({});
        setTokenAdmin(null);
        router.push("/admin");
      })
      .catch((err) => {})
      .finally(() => {
        setIsLoaderLogOut(false);
      });
  };

  useEffect(() => {
    if (!isAuthorizedAdmin && pathname.split("/")[1] === "adminPanel") {
      router.push("/admin");
    }
  }, [isAuthorizedAdmin, pathname, router]);

  return (
    <div className="relative flex h-[100%] min-h-[100vh]">
      <div
        onClick={() => {
          setOpenAdminMenuPopUp((pre: boolean) => !pre);
        }}
        className={`w-[40px] h-[40px] bg-[#010125] text-white rounded-[10px] shadow-md shadow-[#52529b] fixed top-[10px] text-[20px] max-lg:flex hidden items-center justify-center z-40 duration-200 ${
          openAdminMenuPopUp ? "left-[310px]" : "left-[10px]"
        }`}
      >
        {openAdminMenuPopUp ? <BsXLg /> : <BsList />}
      </div>
      <div
        className={`w-[300px] max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:h-[100%] max-lg:w-full max-lg:bg-[#00000062] max-lg:duration-200 ${
          openAdminMenuPopUp
            ? "z-[30]"
            : screenWidth <= 992
            ? "z-[-10] opacity-0"
            : "z-30"
        }`}
      >
        <div className="fixed w-[300px] h-[100%] bg-[#010125] flex flex-col gap-y-[20px] p-[16px]">
          <div className="h-[80px] flex items-center gap-[10px]">
            <img
              src="/images/logo.png"
              alt=""
              className="h-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-y-[10px]">
            <Link href="/adminPanel/products">
              <li
                onClick={() => {
                  if (screenWidth <= 992) {
                    setOpenAdminMenuPopUp(false);
                  }
                }}
                className={`h-[40px] flex items-center px-[10px] rounded-[8px] font-semibold cursor-pointer hover:scale-95 duration-100 hover:bg-[#52526d] ${
                  pathname.split("/")[2] === "products"
                    ? "scale-95 bg-[#52526d]"
                    : "bg-white"
                }`}
              >
                ტანსაცმლები
              </li>
            </Link>
            <Link href="/adminPanel/add-product">
              <li
                onClick={() => {
                  if (screenWidth <= 992) {
                    setOpenAdminMenuPopUp(false);
                  }
                }}
                className={`h-[40px] flex items-center px-[10px] rounded-[8px] font-semibold cursor-pointer hover:scale-95 duration-100 hover:bg-[#52526d] ${
                  pathname.split("/")[2] === "add-product"
                    ? "scale-95 bg-[#52526d]"
                    : "bg-white"
                }`}
              >
                დაამატე ტანსაცმელი
              </li>
            </Link>
            <Link href="/adminPanel/orders">
              <li
                onClick={() => {
                  if (screenWidth <= 992) {
                    setOpenAdminMenuPopUp(false);
                  }
                }}
                className={`h-[40px] flex items-center px-[10px] rounded-[8px] font-semibold cursor-pointer hover:scale-95 duration-100 hover:bg-[#52526d] ${
                  pathname.split("/")[2] === "orders"
                    ? "scale-95 bg-[#52526d]"
                    : "bg-white"
                }`}
              >
                შეკვეთები
              </li>
            </Link>
            {/* <Link href="/adminPanel/add-banner">
              <li
                onClick={() => {
                  if (screenWidth <= 992) {
                    setOpenAdminMenuPopUp(false);
                  }
                }}
                className={`h-[40px] flex items-center px-[10px] rounded-[8px] font-semibold cursor-pointer hover:scale-95 duration-100 hover:bg-[#52526d] ${
                  pathname.split("/")[2] === "add-banner"
                    ? "scale-95 bg-[#52526d]"
                    : "bg-white"
                }`}
              >
                ბანერის დამატება
              </li>
            </Link> */}
            <Link href="/adminPanel/admin-info-edit">
              <li
                onClick={() => {
                  if (screenWidth <= 992) {
                    setOpenAdminMenuPopUp(false);
                  }
                }}
                className={`h-[40px] flex items-center px-[10px] rounded-[8px] font-semibold cursor-pointer hover:scale-95 duration-100 hover:bg-[#52526d] ${
                  pathname.split("/")[2] === "admin-info-edit"
                    ? "scale-95 bg-[#52526d]"
                    : "bg-white"
                }`}
              >
                ადმინის ინფორმაცია
              </li>
            </Link>
            {isLoaderLogOut ? (
              <div className="bg-white h-[40px] flex items-center justify-center rounded-[8px] font-semibold">
                <BiLoader />
              </div>
            ) : (
              <li
                onClick={() => {
                  if (screenWidth <= 992) {
                    setOpenAdminMenuPopUp(false);
                  }
                  logOut();
                }}
                className="bg-white h-[40px] flex items-center px-[10px] rounded-[8px] font-semibold cursor-pointer hover:scale-95 duration-100"
              >
                გასვლა
              </li>
            )}
          </div>
        </div>
      </div>

      <div className="w-[calc(100%-300px)] max-lg:w-full p-[16px] h-[100%]">
        {children}
      </div>
    </div>
  );
}
