"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { BiSearch } from "react-icons/bi";
import { IoIosSearch } from "react-icons/io";
import { BsXLg } from "react-icons/bs";

export default function SearchPopUp() {
  const { setOpenSearch, openSearch } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const initialPlaceholder = "ჩაწერე საძიებო სიტყვა";
  const [placeholder, setPlaceholder] = useState("");
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let timeout: any;

    if (openSearch) {
      inputRef.current?.focus();
      timeout = setTimeout(() => {
        if (isTyping) {
          setIndex((prev) => prev + 1);
          setPlaceholder(initialPlaceholder.substring(0, index));
          if (index === initialPlaceholder.length) {
            setTimeout(() => {
              setIsTyping(false);
              setIndex(initialPlaceholder.length - 1);
            }, 1000);
          }
        } else {
          setIndex((prev) => prev - 1);
          setPlaceholder(initialPlaceholder.substring(0, index));
          if (index === 0) {
            setIsTyping(true);
            setPlaceholder("");
          }
        }
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [openSearch, index, isTyping]);

  return (
    <div
      className={`fixed  left-0 w-[100vw] h-[calc(100vh+150px)] bg-[#00000067] duration-200 ${
        openSearch ? "top-0 z-[20]" : "top-[-150px] z-[-20]"
      }`}
    >
      <div
        className={`relative w-full bg-[white] px-[100px] py-[50px] max-sm:py-[20px] max-lg:px-[50px] max-sm:px-[16px] duration-200 ${
          openSearch ? "" : "mt-[-50px]"
        } `}
      >
        <div className="flex items-center justify-between h-[60px] shadow-md border-[1px] rounded-full py-[10px] pl-[15px] pr-[5px] w-full">
          <IoIosSearch className="text-gray-500 text-[20px]" />
          <input
            type="text"
            ref={inputRef}
            placeholder={placeholder}
            className="bg-[white] outline-none h-full w-[calc(100%-60px)] rounded-[20px] px-[15px] "
          />
          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-[#19c74e] hover:bg-[#010125] duration-150 cursor-pointer text-white">
            <BiSearch />
          </div>
        </div>
        <div
          onClick={() => {
            setOpenSearch(false);
          }}
          className="absolute text-[23px] cursor-pointer rounded-full right-[30px] top-[10px] max-sm:top-[110px] max-sm:right-[20px] flex items-center justify-center w-[40px] h-[40px] bg-[#f2f2f2]"
        >
          <BsXLg />
        </div>
      </div>
    </div>
  );
}
