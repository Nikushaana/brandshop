import React, { useContext, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { UserContext } from "../../../../useContexts/UserAxios";
import { BiLoader } from "react-icons/bi";

interface Prop {
  setActive: (arg0: string) => void;
}

export default function AuthForgetPassword3({ setActive }: Prop) {
  const { setToken }: any = useContext(UserContext);
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [repasswordValue, setRePasswordValue] = useState<string>("");
  const handelChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const handelChangeRePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePasswordValue(e.target.value);
  };
  const [showPass, setShowPass] = useState<boolean>(false);
  const handleShowPass = () => {
    setShowPass((prev) => !prev);
  };

  const [isLoaderEnterPassword, setIsLoaderEnterPassword] = useState(false);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEnterNewPassword();
    }
  };

  const handleEnterNewPassword = () => {
    if (passwordValue === repasswordValue && passwordValue !== "") {
      setIsLoaderEnterPassword(true);
      axiosClient
        .post("auth/restorePassword/updatePassword", {
          password: passwordValue,
        })
        .then((res) => {
          setActive("signin");
          setToken(null);
        })
        .catch((err) => {
        })
        .finally(() => {
          setIsLoaderEnterPassword(false);
        });
    }
  };

  return (
    <div className="forgotpaswordee w-full flex flex-col gap-y-[10px] mt-[-3px] ">
      <p className="text-center text-[18px]">პაროლის აღდგენა</p>

      <div className="flex flex-col gap-y-[10px]">
        <p className="font-semibold text-[#010125]">ახალი პაროლი</p>
        <div className="flex flex-col gap-1">
          <div
            className={`flex w-[100%] h-[50px] border-[1px] ${
              false && "border-red-600"
            } rounded-[10px] items-center pr-[10px] gap-[10px]`}
          >
            <input
              onChange={(e) => handelChangePassword(e)}
              value={passwordValue}
              name="newPasswordValue"
              type={showPass ? "text" : "password"}
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
                <BsEye className="cursor-pointer " />
              ) : (
                <BsEyeSlash className="cursor-pointer" />
              )}
            </div>
          </div>
          {false && (
            <p className="font-semibold text-red-600 text-center text-[12px]">
              ახალი პაროლი უნდა იყო მინიმუმ 8 სიმბოლო
            </p>
          )}
          {false && (
            <p className="font-semibold text-red-600 text-center text-[12px]">
              ახალი პაროლის პირველი სიმბოლო უნდა იყოს დიდი
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-[10px]">
        <p className="font-semibold text-[#010125]">გაიმეორე პაროლი</p>
        <div className="flex flex-col gap-1">
          <div
            className={`flex w-[100%] h-[50px] border-[1px] ${
              false && "border-red-600"
            } rounded-[10px] items-center pr-[10px] gap-[10px]`}
          >
            <input
              onChange={(e) => handelChangeRePassword(e)}
              value={repasswordValue}
              type={showPass ? "text" : "password"}
              name="newPasswordValue2"
              onKeyPress={handleInputKeyPress}
              id="password"
              placeholder="***********"
              className="w-[100%] h-[100%] text-[#010125] shadow-none px-[10px] outline-none rounded-[10px] appearance-none"
            />
            <div
              onClick={handleShowPass}
              className="text-[20px] text-[#010125]"
            >
              {showPass ? (
                <BsEye className="cursor-pointer " />
              ) : (
                <BsEyeSlash className="cursor-pointer" />
              )}
            </div>
          </div>
          {false && (
            <p className="font-semibold text-red-600 text-[12px] text-center">
              სწორად გაიმეორე პაროლი
            </p>
          )}
        </div>
      </div>
      <div
        onClick={() => handleEnterNewPassword()}
        className="flex gap-[5px] pt-[3px] items-center w-[100%] h-[50px] rounded-[10px] justify-center font-semibold text-[18px] cursor-pointer  text-white bg-[black] hover:bg-[#19c74e] duration-200"
      >
        {isLoaderEnterPassword ? (
          <BiLoader className="animate-spin text-[25px]" />
        ) : (
          <h1>დადასტურება</h1>
        )}
      </div>
    </div>
  );
}
