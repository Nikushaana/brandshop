"use client";

import { BsEnvelope, BsKey } from "react-icons/bs";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiLoader } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { UserContext } from "../../../../useContexts/UserAxios";
import { useRouter } from "next/navigation";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";

export default function AdminAuth() {
  const { setTokenAdmin, setAdmin } =
    useContext(UserContext);
  const { isAuthorizedAdmin } = useContext(AxiosForSharingStatesAxiosContext);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (isAuthorizedAdmin && pathname === "/admin") {
      router.push("/adminPanel/products");
    }
  }, [isAuthorizedAdmin, pathname, router]);

  const [showpas, setShowPass] = useState(true);
  const [passwordValue, setPasswordValue] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const [Error, setError] = useState(false);

  const handleInputKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handelSubmit();
    }
  };

  const handleShowpass = () => {
    setShowPass((pre) => !pre);
  };
  const handelChangePassword = (e: any) => {
    setPasswordValue(e.target.value);
  };
  const [EmailValue, setEmailValue] = useState("");
  const handelChangeEmail = (e: any) => {
    setEmailValue(e.target.value);
  };

  const handelSubmit = () => {

    setIsLoader(true);
    if (EmailValue && passwordValue) {
      return axiosClient
        .post("adminAuth/loginAdmin", {
          email: EmailValue,
          password: passwordValue,
        })
        .then(({ data }) => {
          setAdmin(data);
          setTokenAdmin(data.access_token);
          router.push(`/adminPanel/products`);
        })
        .catch((error) => {
          setError(true);
        })
        .finally(() => {
          setIsLoader(false);
        });
    } else {
      setIsLoader(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-black">
      <div
        className="bg-[#1a253b] shadow shadow-[#3d7294]
       duration-200 h-[500px] rounded-[10px] w-5/12 flex flex-col justify-center text-white  gap-[30px] p-16 max-lg:w-8/12 max-md:w-10/12 max-sm:w-full max-sm:p-5 max-md:h-full max-sm:h-[500px]"
      >
        <div className="w-full flex justify-center">
          <div className="w-[250px]">
            <img
              src="/images/clothes1.webp"
              alt=""
              className="w-full object-contain"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-semibold text-white">
            კეთილი იყოს შენი დაბრუნება
          </h1>
          <p className="text-sm text-slate-400">
            გთხოვთ გაიარეთ ავტორიზაცია გასაგრძელებლად
          </p>
        </div>
        <div className="flex flex-col gap-5 mt-6">
          <div className="pv-2 h-10 flex items-center bg-slate-100 gap-x-1 border-[2px] px-3.5 py-1 rounded-md  group ">
            <BsEnvelope className="text-gray-500  text-[18px]" />
            <input
              className="pl-1.5 focus:outline-none bg-slate-100 text-black w-full "
              value={EmailValue}
              onChange={(e) => handelChangeEmail(e)}
              type="text"
              placeholder="ელ-ფოსტა"
              onKeyPress={handleInputKeyPress}
            ></input>
          </div>
          <div className="pv-2 h-10 flex items-center bg-slate-100 group gap-x-1 border-[2px] px-3.5 py-1 rounded-md ">
            <BsKey className="text-gray-500 text-[18px]" />
            <div className="flex items-center justify-between w-full text-black">
              <input
                className="pl-1.5 w-[calc(100%-18px)] bg-slate-100 outline-none"
                value={passwordValue}
                onChange={(e) => handelChangePassword(e)}
                placeholder="პაროლი"
                type={showpas ? "password" : "text"}
                onKeyPress={handleInputKeyPress}
              />
              <div
                className="cursor-pointer"
                onClick={() => {
                  handleShowpass();
                }}
              >
                {true ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <p
              onClick={() => {
                handelSubmit();
              }}
              className={`w-full h-[50px] flex items-center justify-center  rounded-[10px]  text-white text-[18px] bg-[black] shadow shadow-[#3d7294]
      hover:bg-[#3d7294] duration-200 ${
        isLoader ? "cursor-pointer-none" : "cursor-pointer"
      }`}
            >
              {isLoader ? <BiLoader /> : "შესვლა"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
