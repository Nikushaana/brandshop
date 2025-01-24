"use client";

import React, { useContext, useState } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { BsXLg } from "react-icons/bs";
import DropDown from "../DropDown/DropDown";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";

export default function OrderStatusPopUp() {
  const { statusPopUp, setStatusPopUp, statusPopUpData, setrenderEachOrder } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const [statusData, setStatusData] = useState([
    {
      id: 1,
      color_name: "მუშავდება გასაგზავნად..",
    },
    {
      id: 2,
      color_name: "იგზავნება..",
    },
    {
      id: 3,
      color_name: "შესრულდა!",
    },
  ]);

  const [allValues, setAllValues] = useState({
    color_name: "",
  });

  

  const UpdateOrderStatus = (e: any) => {
    e.preventDefault();
    axiosClient
      .post(`admin/order/${statusPopUpData.id}`, {
        status: allValues.color_name,
      })
      .then((res) => {
        setrenderEachOrder(res);
        setStatusPopUp(false);
      })
      .catch((error) => {});
      
  };

  return (
    <div
      className={`bg-[#000000bf]  w-[100vw] h-[100vh] z-[99]  top-0 left-0 items-center flex justify-center ${
        statusPopUp ? "fixed" : "hidden"
      }`}
    >
      <div className="relative w-[450px] z-[99] bg-white rounded-[8px] max-xl:w-[70%] max-md:w-[90%] max-tiny:w-[95%] ">
        <div
          onClick={() => setStatusPopUp(false)}
          className="absolute top-[-40px] right-[-40px] max-md:right-0 max-md:top-[-50px] w-[40px] h-[40px] items-center text-white text-[23px] cursor-pointer justify-center flex rounded-full"
        >
          <BsXLg className="" />
        </div>
        <div className="border-b-[1px] border-black py-[10px] px-[15px]">
          <p>სტატუსის რედაქტირება</p>
        </div>
        <div className="py-[10px] px-[15px] flex flex-col gap-y-[40px]">
          <p>
            მიმდინარე სტატუსი:{" "}
            {statusPopUpData?.status === "Processing"
              ? "მუშავდება გასაგზავნად.."
              : statusPopUpData?.status}
          </p>

          <div className="flex items-center gap-[20px] justify-between">
            <p>შეცვალე სტატუსი</p>
            <div className="w-[250px] bg-[#010125] p-[1px] rounded-[9px]">
              <DropDown
                data={statusData}
                placeholder={
                  statusPopUpData?.status === "Processing"
                    ? "მუშავდება გასაგზავნად.."
                    : statusPopUpData?.status
                }
                setAllValues={setAllValues}
                name="color_name"
              />
            </div>
          </div>
          <h1
            onClick={(e) => {
              UpdateOrderStatus(e);
            }}
            className="px-[14px] py-[7px] rounded-full bg-[#010125] text-white self-end cursor-pointer"
          >
            რედაქტირება
          </h1>
        </div>
      </div>
    </div>
  );
}
