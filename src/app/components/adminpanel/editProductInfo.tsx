"use client";

import React, { useContext, useEffect, useState } from "react";
import { BiLoader } from "react-icons/bi";
import MyInput from "../myinput";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { useRouter } from "next/navigation";
import { ProductsAxiosContext } from "../../../../useContexts/ProductsAxios";
import MyTextArea from "../MyTextArea";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";

export default function EditProductInfo({ paramsId }: any) {
  const { setNewRenderProducts } = useContext(ProductsAxiosContext);
  const { gender } = useContext(AxiosForSharingStatesAxiosContext);
  const [editprodloader, setEditprodloader] = useState(false);
  const [EachProdData, setEachProdData] = useState<any>([]);
  const router = useRouter();

  const [allValues, setAllValues] = useState<any>({});

  useEffect(() => {
    setAllValues((prevValues: any) => ({
      ...prevValues,
      sex: EachProdData.sex,
    }));
  }, [EachProdData]);

  useEffect(() => {
    axiosClient
      .get(`front/product/${paramsId}`)
      .then((res) => {
        setEachProdData(res.data);
        setEditprodloader(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [paramsId]);

  const UpdateProdInfo = (e: any) => {
    e.preventDefault();
    setEditprodloader(true);
    axiosClient
      .post(`admin/product/${paramsId}`, {
        name: allValues.name ? allValues.name : null,
        price: allValues.price ? allValues.price : 0,
        discount_price: allValues.discount_price
          ? allValues.discount_price
          : null,
        weight: allValues.discount_price ? 1 : 0,
        discount_percent: allValues.discount_percent
          ? allValues.discount_percent
          : null,
        description: allValues.description ? allValues.description : null,
        brand: allValues.brand ? allValues.brand : null,
        sex: allValues.sex && allValues.sex,
        product_sizes: allValues.product_sizes && allValues.product_sizes,
        admin_description:
          allValues.admin_description && allValues.admin_description,
      })
      .then((res) => {
        router.push(`/adminPanel/products`);
        setNewRenderProducts(res);
      })
      .catch((error) => {});
  };

  return (
    <div className="w-full flex flex-col gap-7">
      <div className="flex flex-col gap-[20px]">
        <h1 className="text-[24px] max-lg:ml-[50px] max-sm:text-[20px]">
          {`"${EachProdData.name}"`} რედაქტირება
        </h1>
        <div className="w-full bg-[#010125] text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px]">
          <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
            <div className="w-full">
              <MyInput
                name="name"
                firstValue={EachProdData.name}
                setAllValues={setAllValues}
                title="პროდუქტის სათაური"
              />
            </div>
            <div className="w-full">
              <MyInput
                name="brand"
                firstValue={EachProdData.brand}
                setAllValues={setAllValues}
                title="პროდუქტის ბრენდი"
              />
            </div>
            <div className="flex items-center gap-[15px] w-full">
              {gender.map((item: any) => (
                <p
                  key={item.id}
                  onClick={() => {
                    setAllValues((prevValues: any) => ({
                      ...prevValues,
                      sex: item.id,
                    }));
                  }}
                  className={`px-[10px] h-[40px]  rounded-[8px]  text-white flex items-center border-[1px] duration-200 cursor-pointer ${
                    allValues.sex == item.id
                      ? " shadow-md border-white shadow-white"
                      : "border-[#010125]"
                  }`}
                >
                  {item.name}
                </p>
              ))}
            </div>
            <div className="w-full">
              <MyInput
                name="product_sizes"
                firstValue={EachProdData.product_sizes}
                setAllValues={setAllValues}
                title="ტანსაცმლის ზომა"
              />
            </div>
            <div className="w-full">
              <MyInput
                name="admin_description"
                firstValue={EachProdData.admin_description}
                setAllValues={setAllValues}
                title="კატეგორია"
              />
            </div>
            <div className="w-full">
              <MyInput
                name="price"
                firstValue={EachProdData.price}
                setAllValues={setAllValues}
                title="პროდუქტის ფასი"
              />
            </div>
            <div className="w-full">
              <MyInput
                name="discount_price"
                firstValue={EachProdData.discount_price}
                setAllValues={setAllValues}
                title="ფასდაკლებული ფასი"
              />
            </div>
            <div className="w-full">
              <MyInput
                name="discount_percent"
                firstValue={EachProdData.discount_percent}
                setAllValues={setAllValues}
                title="ფასდაკლების პროცენტობა"
              />
            </div>
          </div>
          <div className="w-full h-[110px]">
            <MyTextArea
              name="description"
              firstValue={EachProdData.description}
              setAllValues={setAllValues}
              title="აღწერა"
            />
          </div>

          {/* <p className="hmli text-[17px]">ატვირთე ფოტო</p> */}
          {/* <AddPhoto inputName={"cars_imgs"} /> */}
        </div>

        <div className="w-full rounded-[10px] flex justify-end gap-y-[20px]">
          {editprodloader ? (
            <div className="bg-[#0e1420] text-white hover:bg-[#335f7a] duration-200 px-[40px] h-[50px] rounded-[10px] cursor-pointer flex items-center justify-center">
              პროდუქტი ემატება..
            </div>
          ) : (
            <div
              onClick={(e) => {
                UpdateProdInfo(e);
              }}
              className="bg-[#0e1420] text-white hover:bg-[#335f7a] duration-200 px-[40px] h-[50px] rounded-[10px] cursor-pointer flex items-center justify-center"
            >
              რედაქტირება
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
