import Link from "next/link";
import React from "react";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { BiTrash } from "react-icons/bi";
import { BsEye } from "react-icons/bs";

export default function OrderCard({
  item,
  setNewRenderOrder,
  setIsLoaderOrders,
}: any) {
  const handelDelete = (Id: any) => {
    setIsLoaderOrders(true);
    axiosClient
      .delete(`admin/order/${Id}`)
      .then((response) => {
        setNewRenderOrder(response);
      })
      .catch((error) => {})
      .finally(() => {});
  };
  return (
    <div className="relative flex items-center justify-between bg-[#F1F1F1] py-[15px] px-[20px] rounded-[8px]">
      <div className="">
        <p className="font-semibold">შეკვეთა #{item.id}</p>
        <p className="text-[gray] text-[14px]">
          თარიღი: {item.createdAt.split("T")[0].replace(/-/g, " ")}
        </p>
      </div>
      <div className="flex gap-[10px]">
        <div className="flex items-center bg-[#010125] rounded-full h-[40px] px-[30px] max-tiny:w-[40px] max-lg:px-[15px] max-tiny:px-0 max-tiny:justify-center text-white gap-[10px] cursor-pointer hover:scale-105 duration-100">
          <Link href={`/adminPanel/orders/${item.id}`}>
            <p className="max-tiny:hidden">შეკვეთის ნახვა</p>
            <BsEye className="max-tiny:flex hidden" />
          </Link>
        </div>
        <div
          onClick={() => {
            handelDelete(item.id);
          }}
          className="flex items-center justify-center bg-[red] rounded-full h-[40px] w-[40px] text-white cursor-pointer hover:scale-105 duration-100"
        >
          <BiTrash />
        </div>
      </div>

      {/* <p className="absolute top-[-10px] left-[50%] translate-x-[-50%] bg-[#010125] text-white px-[10px] shrink-0 py-[4px] rounded-[5px] duration-100 text-[14px]">
        {item.status === "Processing" ? "მუშავდება გასაგზავნად.." : item.status}
      </p> */}
    </div>
  );
}
