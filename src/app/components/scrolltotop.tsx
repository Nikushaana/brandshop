"use client";

import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function Scrolltotop() {
  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

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
      onClick={() => {
        goToTop();
      }}
      className={`fixed bottom-[50px] z-20 right-[20px] cursor-pointer text-white text-[22px]  hover:scale-105 duration-200 rounded-full bg-[black] flex items-center justify-center ${
        scrollY > 700
          ? "w-[45px] h-[45px] max-sm:w-[55px] max-sm:h-[55px] border-[5px] hover:border-[2px]"
          : "w-0 h-0"
      }`}
    >
      <IoIosArrowUp className="" />
    </div>
  );
}
