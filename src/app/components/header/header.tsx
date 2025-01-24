"use client";

import Image from "next/image";
import Link from "next/link";

import { IoIosSearch } from "react-icons/io";
import { GoPerson } from "react-icons/go";
import { SlLogout } from "react-icons/sl";
import { BsCart2 } from "react-icons/bs";
import { BsList } from "react-icons/bs";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { CartAxiosContext } from "../../../../useContexts/CartAxios";
import axios from "axios";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import Loader1 from "../loaders/loader1";
import { BiLoader } from "react-icons/bi";

export default function Header() {
  const {
    setOpenMenu,
    setOpenCart,
    section1Ref,
    section2Ref,
    section3Ref,
    scrollToSection,
  } = useContext(AxiosForSharingStatesAxiosContext);

  const { localCartProdKeyData } = useContext(CartAxiosContext);
  const pathname = usePathname();
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        pathname === "/admin" || pathname.split("/")[1] === "adminPanel"
          ? "hidden"
          : "flex"
      } items-center  justify-between  w-full shadow-md px-[100px] max-lg:px-[50px] max-sm:px-[16px] duration-200 ${
        scrollY > 130
          ? "bg-white py-[10px] fixed top-0 left-0 z-[10] "
          : "py-[20px] fixed top-0 left-0 z-[10] bg-white"
      }`}
    >
      <div className="flex items-center gap-[20px] max-tiny:gap-[10px]">
        <div
          onClick={() => {
            setOpenMenu(true);
          }}
          className={`w-[40px] max-md:w-[35px] max-md:h-[35px] h-[40px] text-[26px] max-lg:flex hidden items-center justify-center`}
        >
          <BsList />
        </div>
        <Link href="/" className="h-[60px] w-[100px] max-md:h-[40px] relative">
          <Image
            src={"/images/logomain.PNG"}
            alt={""}
            sizes="500px"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </Link>
      </div>

      <ul className={`flex items-center gap-[30px] max-lg:hidden`}>
        <Link href="/">
          <li>
            <h1>მთავარი</h1>
          </li>
        </Link>
        <li
          onClick={() => {
            if (pathname === "/") {
              scrollToSection(section1Ref);
            } else {
              router.push("/");
            }
          }}
          className="cursor-pointer"
        >
          <h1>პროდუქტები</h1>
        </li>
        <li
          onClick={() => {
            if (pathname === "/") {
              scrollToSection(section2Ref);
            } else {
              router.push("/");
            }
          }}
          className="cursor-pointer"
        >
          <h1>ჩვენ შესახებ</h1>
        </li>
        <li
          onClick={() => {
            if (pathname === "/") {
              scrollToSection(section3Ref);
            } else {
              router.push("/");
            }
          }}
          className="cursor-pointer"
        >
          <h1>კონტაქტი</h1>
        </li>
      </ul>

      <div className="flex items-center gap-[10px]">
        <div
          onClick={() => {
            setOpenCart(true);
          }}
          className={`relative text-[24px] w-[40px] h-[40px] max-md:w-[35px] max-md:h-[35px] flex items-center  justify-center cursor-pointer`}
        >
          <BsCart2 />
          <p className="absolute top-[0px] right-[0px] w-[20px] h-[20px] max-md:w-[18px] max-md:h-[18px] bg-[black] text-white rounded-full text-[12px] pt-[1px] flex items-center justify-center">
            {localCartProdKeyData?.length}
          </p>
        </div>
      </div>
    </div>
  );
}
