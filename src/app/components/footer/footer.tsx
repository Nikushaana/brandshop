"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function Footer() {
  const pathname = usePathname();
  return (
    <div
      className={`${
        pathname === "/admin" || pathname.split("/")[1] === "adminPanel"
          ? "hidden"
          : "flex"
      } py-[10px] bg-[black] items-center justify-center px-[100px] max-lg:px-[50px] max-sm:px-[16px] text-white max-md:flex-col`}
    >
        <p>Made with love❤️</p>
    </div>
  );
}
