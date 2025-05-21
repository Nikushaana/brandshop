"use client";

import ProdSlider from "@/app/components/ProdSlider/ProdSlider";
import ProductContent2 from "@/app/components/productin/productincontent";
import React, { useEffect, useState } from "react";
// import { getDataOfProducts } from "../../../../useContexts/getServerSide/getData";
import ProdSlider2 from "@/app/components/ProdSlider/ProdSlider2";

export default function page({
  params,
}: {
  params: { productId: string };
}) {
  // const productInfo = await getDataOfProducts();

  return (
    <div
      className={` max-[768px]:mt-[80px] mt-[100px] px-[50px] max-sm:px-[16px] pt-[80px] max-md:pt-[40px] pb-[100px] flex flex-col gap-y-[100px]`}
    >
      <ProductContent2  />
      <ProdSlider2 title="შესაძლოა დაგაინტერესოთ" />
      {/* <ProductContent2 itemId={params.productId} />
      <ProdSlider2 productInfo={productInfo} title="შესაძლოა დაგაინტერესოთ" /> */}
    </div>
  );
}

