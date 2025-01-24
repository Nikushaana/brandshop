"use client";

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { RiImageAddFill } from "react-icons/ri";

export default function CardStyle1({ item, slider }: any) {
  return (
    <div className="w-full relative flex flex-col gap-y-[5px] duration-200 select-none justify-between">
      {item.discount_percent && (
        <div className="absolute top-[10px] left-[10px] z-[2] bg-[red] shadow text-white h-[30px] px-[10px] text-[14px] flex items-center rounded-[3px]">
          -{item.discount_percent}%
        </div>
      )}

      <Link
        href={`/product/${item.id}`}
        className={`relative h-[350px] max-tiny:h-[280px] mb-[10px]  shadow-md hover:shadow-lg  duration-200 rounded-[8px] overflow-hidden ${
          slider ? "" : "hover:rotate-[2deg] max-lg:hover:rotate-0"
        }`}
      >
        {item.imgs_color.length === 0 ? (
          <div className="w-full h-full">
            <div className="w-full h-full bg-[#010125] text-white flex flex-col gap-y-[10px] items-center justify-center">
              <RiImageAddFill className="text-[30px]" />
              <p className="text-center">ფოტოები არ მოიძებნა</p>
            </div>
          </div>
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${item.imgs_color[0]?.photos[0]?.url}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            width={500}
            height={300}
            alt=""
          />
        )}
      </Link>

      <h1 className="line-clamp-1">{item.name}</h1>
      <p className="line-clamp-1 text-[14px] text-gray-500">
        ზომა: {item.product_sizes}
      </p>
      <p className="line-clamp-1 text-[14px] text-gray-500">
        {item.description}
      </p>

      <div className="h-[35px] flex items-end gap-[5px]">
        <h1 className="text-[22px]">
          ₾{item.discount_price ? item.discount_price : item.price}
        </h1>
        {item.discount_price && (
          <h1 className="text-[16px] line-through text-[red] ">
            ₾{item.discount_price ? item.price : item.discount_price}
          </h1>
        )}
      </div>
    </div>
  );
}
