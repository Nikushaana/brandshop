"use client";

import React, { useContext } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import { BiCheck } from "react-icons/bi";

export default function Alert() {
  const {
    setOpenCart,
    showAlert,
    setShowAlert,
    alertText,
    Alertstatus,
  } = useContext(AxiosForSharingStatesAxiosContext);
  return (
    <div
      className={`fixed left-[50%] py-[10px] translate-x-[-50%] px-[20px] max-md:w-[90%] text-[17px] bg-[#010125] text-white flex flex-col gap-y-[10px] items-center justify-center z-30 rounded-[10px] shadow-md shadow-gray-500 duration-100 ${
        showAlert ? "top-[30px]" : "top-[-180px]"
      }`}
    >
      <div className="flex items-center gap-[15px]">
        <p className="my-[5px] text-center">{alertText}</p>
        {Alertstatus && (
          <div className="text-[30px] text-[green]">
            <BiCheck />
          </div>
        )}
      </div>
      {alertText === "პროდუქტი დაემატა კალათაში" && (
        <p
          onClick={() => {
            setOpenCart(true);
            setShowAlert(false);
          }}
          className="bg-[#19c74e] h-[35px] text-[14px] cursor-pointer hover:scale-105 duration-100 px-[10px] flex items-center rounded-[10px]"
        >
          კალათის ნახვა
        </p>
      )}
    </div>
  );
}
