"use client";

import { BiLoader } from "react-icons/bi";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductsAxiosContext } from "../../../../useContexts/ProductsAxios";
import MyInput from "../myinput";
import MyTextArea from "../MyTextArea";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";

export default function AddProduct() {
  const { setNewRenderProducts } = useContext(ProductsAxiosContext);
  const { gender, setAlertText, setShowAlert, setAlertstatus } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  const date = Date();
  const [allValues, setAllValues] = useState<any>({
    code: date,
    link: date,
    sex: 0,
  });

  const [addprodloader, setAddprodloader] = useState(false);

  const router = useRouter();

  const handleAddProduct = (e: any) => {
    e.preventDefault();
    setAddprodloader(true);

    const postValues = {
      ...allValues,
      weight: allValues.discount_price ? 1 : 0,
    };

    axiosClient
      .post("admin/product", postValues)
      .then((res) => {
        router.push(`/adminPanel/products`);
        setNewRenderProducts(res);
        setShowAlert(true);
        setAlertstatus(true);
        setAlertText("სამოსი წარმატებით დაემატა");
      })
      .catch((error) => {
        setShowAlert(true);
        setAlertstatus(false);
        setAlertText("სამოსი ვერ დაემატა");
      })
      .finally(() => {
        setAddprodloader(false);
      });
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  return (
    <div className="w-full flex flex-col gap-7">
      <div className="flex flex-col gap-[20px]">
        <h1 className="text-[24px] max-lg:ml-[60px] max-sm:text-[20px]">
          ტანსაცმლის დამატება
        </h1>
        <p className="text-black">
          დაამატე ახალი პროდუქტის ინფორმაცია, ხოლო ფოტოების დამატებას პროდუქტის
          ინფორმაციის ატვირთვის შემდეგ შეძლებ.
        </p>
        <div
          className={`w-full text-white rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px] duration-150 ${
            addprodloader ? "pointer-events-none bg-gray-500" : "bg-[#010125]"
          }`}
        >
          <div className="w-full grid grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
            <div className=" w-full">
              <MyInput
                name="name"
                setAllValues={setAllValues}
                title="ტანსაცმლის სათაური"
              />
            </div>
            <div className=" w-full">
              <MyInput
                name="brand"
                setAllValues={setAllValues}
                title="ტანსაცმლის ბრენდი"
              />
            </div>
            <div className="flex items-center gap-[15px]">
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
            <div className=" w-full">
              <MyInput
                name="product_sizes"
                setAllValues={setAllValues}
                title="ტანსაცმლის ზომა"
              />
            </div>
            <div className=" w-full">
              <MyInput
                name="admin_description"
                setAllValues={setAllValues}
                title="კატეგორია"
              />
            </div>
            <div className=" w-full">
              <MyInput
                name="price"
                setAllValues={setAllValues}
                title="ტანსაცმლის ფასი"
              />
            </div>
            <div className=" w-full">
              <MyInput
                name="discount_price"
                setAllValues={setAllValues}
                title="ფასდაკლებული ფასი"
              />
            </div>
            <div className=" w-full">
              <MyInput
                name="discount_percent"
                setAllValues={setAllValues}
                title="ფასდაკლების პროცენტობა"
              />
            </div>
          </div>

          <div className="w-full h-[110px]">
            <MyTextArea
              name="description"
              setAllValues={setAllValues}
              title="აღწერა"
            />
          </div>
        </div>

        <div className="w-full rounded-[10px] flex justify-end gap-y-[20px]">
          {addprodloader ? (
            <div className="bg-[#0e1420] text-white hover:bg-[#335f7a] duration-200 px-[40px] h-[50px] rounded-[10px] cursor-pointer flex items-center justify-center">
              ტანსაცმელი ემატება..
            </div>
          ) : (
            <h1
              onClick={(e) => {
                handleAddProduct(e);
              }}
              className="bg-[#0e1420] text-white hover:bg-[#335f7a] duration-200 px-[40px] h-[50px] rounded-[10px] cursor-pointer flex items-center justify-center"
            >
              გამოქვეყნება
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
