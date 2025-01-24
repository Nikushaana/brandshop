"use client";

import React, { useContext } from "react";
import { BiLoader } from "react-icons/bi";
import MyInput from "../myinput";
import { UserContext } from "../../../../useContexts/UserAxios";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import Loader1 from "../loaders/loader1";

export default function InformationEditContent() {
  const { admin, isLoaderAdmin, setIsLoaderAdmin, setNewRenderAdmin } =
    useContext(UserContext);

  const UpdateProfile = async (e: any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setIsLoaderAdmin(true);
    axiosClient
      .post(`admin`, formData)
      .then((res) => {
        setNewRenderAdmin(res);
      })
      .catch((error) => {});
  };

  return (
    <div>
      {isLoaderAdmin ? (
        <div>
          <Loader1 />
        </div>
      ) : (
        <form onSubmit={UpdateProfile} className="flex flex-col gap-[10px]">
          <div className="flex flex-col gap-[10px] w-full max-md:w-full bg-[#010125] p-[20px] rounded-[10px] text-white">
            <div className="w-[300px] max-sm:w-full">
              <MyInput
                title={"ელ-ფოსტა"}
                firstValue={admin?.email}
                setAllValues={undefined}
                name="email"
              />
            </div>
            <div className="w-[300px] max-sm:w-full">
              <MyInput
                title={"ახალი პაროლი"}
                firstValue={undefined}
                setAllValues={undefined}
                name="password"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#010125] text-white h-[40px] flex items-center px-[15px] cursor-pointer rounded-[10px]"
            >
              <h1>ცვლილების დამახსოვრება</h1>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
