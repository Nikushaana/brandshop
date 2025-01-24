"use client";

import React, { useContext, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { UserContext } from "../../../../useContexts/UserAxios";
import { BiLoader } from "react-icons/bi";

interface Prop {
  setActive: (arg0: string) => void;
}

export default function AuthForgetPassword2({ setActive }: Prop) {
  const { setToken }: any = useContext(UserContext);
  const [codeValue, setCodeValue] = useState<string>("");
  const handleControlCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodeValue(e.target.value);
  };
  const [showPass, setShowPass] = useState<boolean>(false);
  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const [isLoaderEnterCode, setIsLoaderEnterCode] = useState(false);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEnterCode();
    }
  };

  const handleEnterCode = () => {
    if (codeValue !== "") {
      setIsLoaderEnterCode(true)
      axiosClient
        .post("auth/restorePassword/checkCode", { code: codeValue })
        .then((res) => {
          setActive("forgetpass3");
          setToken(res.data.reset_token);
        })
        .catch((err) => {
        })
        .finally(()=>{
          setIsLoaderEnterCode(false)
        })
    }
  };

  return (
    <div className="forgotpaswordee w-full flex flex-col gap-y-[10px] mt-[-3px] ">
      <p className="text-center text-[18px]">პაროლის აღდგენა</p>

      <div className="flex flex-col gap-y-[10px]">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-[#010125]">კოდი</p>
          <div
            className={`flex w-[100%] h-[50px] border-[1px] ${
              false && "border-red-600"
            } rounded-[10px] items-center pr-[10px] gap-[10px]`}
          >
            <input
              value={codeValue}
              onChange={(e) => handleControlCode(e)}
              type={showPass ? "text" : "password"}
              name="password"
              id="password"
              onKeyPress={handleInputKeyPress}
              placeholder="***********"
              className="w-[100%] h-[100%] text-[#010125] shadow-none px-[10px] outline-none rounded-[10px] appearance-none"
            />
            <div
              onClick={handleShowPass}
              className="text-[20px] text-[#010125]"
            >
              {showPass ? (
                <BsEye className="cursor-pointer" />
              ) : (
                <BsEyeSlash className="cursor-pointer" />
              )}
            </div>
          </div>
          {false && (
            <p className="font-semibold text-red-600 text-center text-[12px]">
              კოდი არასწორია
            </p>
          )}
        </div>
      </div>

      <div
        onClick={() => handleEnterCode()}
        className="flex gap-[5px] pt-[3px] items-center w-[100%] h-[50px] rounded-[10px] justify-center font-semibold text-[18px] cursor-pointer  text-white bg-[black] hover:bg-[#19c74e] duration-200"
      >
        {isLoaderEnterCode ? (
          <BiLoader className="animate-spin text-[25px]" />
        ) : (
          <h1>გაგრძელება</h1>
        )}
      </div>
    </div>
  );
}
