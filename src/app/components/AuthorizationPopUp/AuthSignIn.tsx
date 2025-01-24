import React, { useContext, useState } from "react";
import { BsEye, BsEyeSlash, BsLock } from "react-icons/bs";
import { UserContext } from "../../../../useContexts/UserAxios";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import Loader1 from "../loaders/loader1";
import { BiLoader } from "react-icons/bi";

interface Prop {
  setActive: (arg0: string) => void;
  setOpenAuthorization: (arg0: boolean) => void;
}

export default function AuthSignIn({ setActive, setOpenAuthorization }: Prop) {
  const { setUser, setToken }: any = useContext(UserContext);

  const [isLoader, setIsLoader] = useState<boolean>(false);
  const [show, setshow] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleshow = () => {
    setshow((pre) => !pre);
  };

  const [EmailValue, setEmailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");

  const handelChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };
  const handelChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handelSubmit();
    }
  };

  const handelSubmit = () => {
    setIsLoader(true);

    if (EmailValue && passwordValue) {
      return axiosClient
        .post("/auth/login", {
          email: EmailValue,
          password: passwordValue,
        })
        .then(({ data }) => {
          setUser(data.user);
          setToken(data.token);
          setOpenAuthorization(false);
        })
        .catch((error) => {
          setIsError(true);
          setIsLoader(false);
        })
        .finally(() => {
          setIsLoader(false);
        });
    } else {
      setIsLoader(false);
    }
  };

  return (
    <div className="w-[100%] flex flex-col  gap-y-[20px]">
      <p className="text-[15px] mb-[15px] text-[#3f3f3f] font-semibold">შეიყვანეთ ინფორმაცია</p>

      <div className="flex border-[1px] hover:border-[#19c74e] rounded-[5px] w-full px-[7px] h-[50px] text-gray-500 items-center">
        <input
          value={EmailValue}
          onChange={(e) => handelChangeEmail(e)}
          type="text"
          onKeyPress={handleInputKeyPress}
          className="outline-none w-[100%] pb-[5px]"
          placeholder="ელ-ფოსტა"
        />
      </div>
      <div className="flex border-[1px] hover:border-[#19c74e] rounded-[5px] w-full px-[7px] h-[50px] text-gray-500 items-center">
        <input
          className="outline-none w-[100%] pb-[5px]"
          name="password"
          id="password"
          value={passwordValue}
          onChange={(e) => handelChangePassword(e)}
          onKeyPress={handleInputKeyPress}
          placeholder="***********"
          type={show ? "text" : "password"}
        />
        <div onClick={handleshow} className="text-[16px] text-[#010125]">
          {show ? (
            <BsEye className="cursor-pointer" />
          ) : (
            <BsEyeSlash className="cursor-pointer" />
          )}
        </div>
      </div>
      {isError && (
        <p className="text-center text-[red]">ინფორმაცია არასწორია</p>
      )}
      <div className="flex gap-[30px]">
        <p
          className="underline cursor-pointer"
          onClick={() => {
            setActive("forgetpass1");
          }}
        >
          დაგავიწყდა პაროლი?
        </p>
      </div>
      <div
        onClick={() => {
          handelSubmit();
        }}
        className="flex rounded-[5px] w-full pr-[7px] h-[60px] text-white bg-[black] hover:bg-[#19c74e] duration-100 items-center flex-col justify-center cursor-pointer"
      >
        {isLoader ? (
          <div className="">
            <BiLoader className="animate-spin text-[24px]"/>
          </div>
        ) : (
          <h1>შესვლა</h1>
        )}
      </div>
    </div>
  );
}
