"use client";

import React, { useContext, useState } from "react";
import { BsXLg } from "react-icons/bs";
import AuthSignIn from "./AuthSignIn";
import AuthRegistration from "./AuthRegistration";
import AuthForgetPassword1 from "./AuthForgetPassword1";
import AuthForgetPassword2 from "./AuthForgetPassword2";
import AuthForgetPassword3 from "./AuthForgetPassword3";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";

export default function AuthorizationPopUp() {
  const { setOpenAuthorization, openAuthorization } = useContext(
    AxiosForSharingStatesAxiosContext
  );
  const [active, setActive] = useState<string>("signin");
  return (
    <div
      className={`bg-[#000000bf]  w-[100vw] h-[100vh] z-[99]  top-0 left-0 items-center flex justify-center ${
        openAuthorization ? "fixed" : "hidden"
      }`}
    >
      <div className="relative w-[450px] z-[99] bg-white rounded-[8px] max-xl:w-[70%] max-md:w-[90%] max-tiny:w-[95%]">
        <div
          onClick={() => setOpenAuthorization(false)}
          className="absolute top-[-40px] right-[-40px] max-md:right-0 max-md:top-[-50px] w-[40px] h-[40px] items-center text-white text-[23px] cursor-pointer justify-center flex rounded-full"
        >
          <BsXLg className="" />
        </div>
        <div className="pt-[30px] px-[40px] pb-[50px] flex  flex-col gap-y-[20px]">
          <div className="relative flex self-start gap-[10px] bg-[#e4e7ea] p-[10px] rounded-[3px]">
            <p
              className={`text-[14px] z-[2] duration-100 font-semibold h-[35px] w-[100px] justify-center flex items-center rounded-[3px] cursor-pointer ${
                active === "signin" ? "" : ""
              }`}
              onClick={() => {
                setActive("signin");
              }}
            >
              ავტორიზაცია
            </p>
            <p
              className={`text-[14px] z-[2] duration-100 font-semibold h-[35px] w-[100px] justify-center flex items-center rounded-[3px] cursor-pointer ${
                active === "newacc" ? "" : ""
              }`}
              onClick={() => {
                setActive("newacc");
              }}
            >
              რეგისტრაცია
            </p>
            <div
              className={`absolute top-[10px] duration-150 z-[1] bg-white shadow-md h-[calc(100%-20px)] rounded-[3px] w-[100px] ${
                active === "newacc" ? "left-[120px]" : "left-[10px]"
              }`}
            ></div>
          </div>
          <div className="min-h-[300px] flex items-center">
            {active === "signin" && (
              <AuthSignIn
                setActive={setActive}
                setOpenAuthorization={setOpenAuthorization}
              />
            )}
            {active === "newacc" && <AuthRegistration setActive={setActive} />}
            {active === "forgetpass1" && (
              <AuthForgetPassword1 setActive={setActive} />
            )}
            {active === "forgetpass2" && (
              <AuthForgetPassword2 setActive={setActive} />
            )}
            {active === "forgetpass3" && (
              <AuthForgetPassword3 setActive={setActive} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
