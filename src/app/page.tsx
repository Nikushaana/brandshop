"use client";

import { useEffect, useState } from "react";
import Home from "./components/mainPage/Home";

export default function Page() {
  return (
    <div className={` max-[768px]:mt-[80px] mt-[100px] `}>
      <Home />
    </div>
  );
}
