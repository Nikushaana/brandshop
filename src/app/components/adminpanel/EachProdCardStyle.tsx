import React, { useState } from "react";
import Link from "next/link";
import { BiPen, BiTrash } from "react-icons/bi";
import { FaPencil } from "react-icons/fa6";
import { RiImageAddFill } from "react-icons/ri";
import Image from "next/image";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";

export default function EachProdCardStyle({ item, setNewRenderProducts }: any) {
  const handelDelete = (Id: number) => {
    axiosClient
      .delete(`admin/product/${Id}`)
      .then((response) => {
        setNewRenderProducts(response);
      })
      .catch((error) => {})
      .finally(() => {});
  };
  const [activeColor_imgs, setActiveColor_imgs] = useState<any>(0);

  return (
    <div
      key={item.id}
      className="relative flex flex-col gap-y-[5px] shadow-lg border-[1px] p-[10px] max-tiny:p-[5px] rounded-[20px] select-none w-full justify-between"
    >
      <div
        onClick={() => {
          handelDelete(item.id);
        }}
        className="absolute z-10 top-[15px] left-[15px] max-tiny:top-[10px] max-tiny:left-[10px] bg-[#db6060] w-[40px] h-[40px] shadow-md cursor-pointer hover:bg-[#ca3333] hover:text-white flex items-center justify-center rounded-[8px] text-[20px] hover:text-[24px] duration-200"
      >
        <BiTrash />
      </div>

      {item.discount_percent && (
        <div className="absolute top-[20px] z-[5] left-[50%] translate-x-[-50%] bg-[green] shadow text-white h-[30px] px-[10px] text-[14px] flex items-center rounded-full">
          -{item.discount_percent}%
        </div>
      )}

      <div className="absolute z-10 top-[15px] right-[15px] max-tiny:top-[10px] max-tiny:right-[10px] flex flex-col gap-y-[5px]">
        <Link
          href={`products/add-product-imgs/${item?.id}`}
          className={` bg-[white] w-[40px] h-[40px] shadow-md cursor-pointer hover:bg-[#010125] hover:border-[1px] border-white hover:text-white items-center justify-center rounded-[8px] text-[20px] hover:text-[24px] duration-200 ${
            item.imgs_color.length !== 0 ? "flex" : "hidden"
          }`}
        >
          <RiImageAddFill />
        </Link>

        <Link
          href={`products/edit-product-info/${item?.id}`}
          className="bg-[gray] w-[40px] h-[40px] shadow-md cursor-pointer hover:bg-[#494949] hover:border-[1px] border-white hover:text-white items-center justify-center rounded-[8px] text-[20px] flex hover:text-[24px] duration-200"
        >
          <FaPencil />
        </Link>
      </div>

      <div className="h-[200px] max-tiny:h-[160px] bg-white max-lg:p-[5px] max-tiny:p-0 overflow-hidden rounded-[10px]">
        {item.imgs_color.length === 0 ? (
          <Link
            href={`products/add-product-imgs/${item?.id}`}
            className="w-full h-full"
          >
            <div className="w-full h-full  bg-[#010125] text-white flex flex-col gap-y-[10px] items-center justify-center hover:scale-105 duration-100 cursor-pointer">
              <RiImageAddFill className="text-[30px]" />
              <p className="text-center">
                დაამატე ფოტოები და ზომები
              </p>
            </div>
          </Link>
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${item.imgs_color[activeColor_imgs]?.photos[0]?.url}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
            width={500}
            height={300}
            alt=""
          />
        )}
      </div>

      <p className="line-clamp-2">{item.name}</p>

      <div className="flex justify-between max-[560px]:flex-col max-[560px]:gap-y-[10px]">
        <div className="h-[35px] flex items-end gap-[5px]">
          <p className="text-[#179A34] ">
            ₾{item.discount_price ? item.discount_price : item.price}
          </p>
          {item.discount_price && (
            <p className="text-[13px] line-through text-[red] ">
              ₾{item.discount_price ? item.price : item.discount_price}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-[10px]">
        {item.imgs_color.map((item1: any, index: any) => (
          <div
            key={item1.id}
            className={`border-[1px] rounded-full duration-100 w-[25px] h-[25px] ${
              activeColor_imgs === index
                ? " border-[#010125] p-[2px]"
                : " border-[gray] shadow hover:p-[2px] hover:border-[#010125]"
            }`}
          >
            <div
              onClick={() => {
                setActiveColor_imgs(index);
              }}
              className={`${item1.color_code} w-full h-full rounded-full cursor-pointer `}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
