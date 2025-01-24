"use client";

import React, { useContext } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import Link from "next/link";
import Image from "next/image";
import { BsXLg } from "react-icons/bs";

export default function MenuPopUp() {
  const {
    openMenu,
    setOpenMenu,
    section1Ref,
    section2Ref,
    section3Ref,
    scrollToSection,
  } = useContext(AxiosForSharingStatesAxiosContext);
  return (
    <div
      className={`fixed top-0 left-0 h-[100%] w-full bg-[#00000062] duration-200 ${
        openMenu ? "z-[30]" : "z-[-10] opacity-0"
      }`}
    >
      <div
        className={`w-[300px] bg-white h-full duration-200 py-[50px] px-[30px] flex flex-col items-end gap-y-[20px] ${
          openMenu ? "ml-0" : "ml-[-300px]"
        }`}
      >
        <div
          onClick={() => {
            setOpenMenu(false);
          }}
          className="w-[40px] h-[40px] flex items-center justify-center text-[30px] cursor-pointer rounded-[8px]"
        >
          <BsXLg />
        </div>
        <ul className="flex flex-col gap-[10px] w-[100%]">
          <Link
            href="/"
            onClick={() => {
              setOpenMenu(false);
            }}
          >
            <li className="h-[50px] w-full flex items-center border-b-[1px]">
              მთავარი
            </li>
          </Link>
          <Link href="/">
            <li
              onClick={() => {
                scrollToSection(section1Ref);
                setOpenMenu(false);
              }}
              className="h-[50px] w-full flex items-center border-b-[1px]"
            >
              პროდუქტები
            </li>
          </Link>
          <Link href="/">
            <li
              onClick={() => {
                scrollToSection(section2Ref);
                setOpenMenu(false);
              }}
              className="h-[50px] w-full flex items-center border-b-[1px]"
            >
              ჩვენს შესახებ
            </li>
          </Link>
          <Link href="/">
            <li
              onClick={() => {
                scrollToSection(section3Ref);
                setOpenMenu(false);
              }}
              className="h-[50px] w-full flex items-center border-b-[1px]"
            >
              კონტაქტი
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
