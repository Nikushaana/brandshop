"use client";

import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ProductsAxiosContext } from "../../../../useContexts/ProductsAxios";
import AddPhoto from "../addphoto/AddPhoto";
import DropDown from "../DropDown/DropDown";
import Loader1 from "../loaders/loader1";
import MyInput from "../myinput";
import ProductInfoCard from "./productInfoCard";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";

export default function AddProductImgs({ paramsId }: any) {
  const { setNewRenderProducts } = useContext(ProductsAxiosContext);
  const {
    newRenderProductsImgsandColor,
    loaderEachCardData,
    setLoaderEachCardData,
  } = useContext(AxiosForSharingStatesAxiosContext);
  const [allValues, setAllValues] = useState({
    color_name: "",
    color_code: "",
    quantity: "",
  });

  const [addprodimgsloader, setAddprodimgsloader] = useState(false);
  const [eachProdData, setEachProdData] = useState<any>([]);
  const [loaderEachData, setLoaderEachData] = useState<boolean>(true);

  const router = useRouter();

  useEffect(() => {
    setLoaderEachData(true);
    axiosClient
      .get(`front/product/${paramsId}`)
      .then((res) => {
        setEachProdData(res.data);
        setLoaderEachData(false);
        setLoaderEachCardData(false);
      })
      .catch((error) => {})
      .finally(() => {});
  }, [paramsId, newRenderProductsImgsandColor]);

  const handleAddProductImgs = (e: any) => {
    e.preventDefault();
    if (
      ![undefined, ""].includes(allValues.color_name) &&
      ![undefined, ""].includes(allValues.color_code) &&
      ![undefined, ""].includes(allValues.quantity)
    ) {
      setAddprodimgsloader(true);
      const form = e.target;
      const formData = new FormData(form);

      formData.append("color_name", allValues.color_name);
      formData.append("color_code", allValues.color_code);

      axiosClient
        .post(`admin/productImageColors/${eachProdData.id}`, formData)
        .then((res) => {
          router.push(`/adminPanel/products`);
          setNewRenderProducts(res);
        })
        .catch((error) => {})
        .finally(() => {
          setAddprodimgsloader(false);
        });
    } else {
      setNewRenderProducts(true);
    }
  };

  const [colorsData, setColorsData] = useState([
    {
      id: 1,
      color_name: "წითელი",
      color_code: "bg-[red]",
    },
    {
      id: 2,
      color_name: "ყვითელი",
      color_code: "bg-[yellow]",
    },
    {
      id: 3,
      color_name: "ვარდისფერი",
      color_code: "bg-[#fad2da]",
    },
    {
      id: 4,
      color_name: "ნაცრისფერი",
      color_code: "bg-gray-300",
    },
    {
      id: 5,
      color_name: "კრემისფერი",
      color_code: "bg-[#f4e5c2]",
    },
    {
      id: 6,
      color_name: "მწვანე",
      color_code: "bg-[green]",
    },
    {
      id: 7,
      color_name: "ლურჯი",
      color_code: "bg-[blue]",
    },
    {
      id: 8,
      color_name: "ოქროსფერი",
      color_code: "bg-[#E5B80B]",
    },
    {
      id: 9,
      color_name: "ვერცხლისფერი",
      color_code: "bg-[#C0C0C0]",
    },
    {
      id: 10,
      color_name: "შავი",
      color_code: "bg-[black]",
    },
    {
      id: 11,
      color_name: "თეთრი",
      color_code: "bg-white",
    },
    {
      id: 12,
      color_name: "ყავისფერი",
      color_code: "bg-[brown]",
    },
  ]);

  return (
    <div className="w-full flex flex-col gap-7">
      {loaderEachData ? (
        <div>
          <Loader1 />
        </div>
      ) : (
        <form
          className="flex flex-col gap-[20px]"
          onSubmit={handleAddProductImgs}
          encType="multipart/form-data"
        >
          <h1 className="text-[24px]  max-lg:ml-[60px] max-sm:text-[20px]">
            {`"${eachProdData.name}"`} ფოტოების დამატება
          </h1>
          <div
            className={`w-full  rounded-[10px] flex flex-col gap-y-[20px] px-[20px] py-[30px] max-sm:px-[10px] duration-150 ${
              addprodimgsloader
                ? "bg-gray-500 pointer-events-none"
                : "bg-[#010125]"
            }`}
          >
            <div className="w-[200px]">
              <DropDown
                data={colorsData}
                placeholder="აირჩიე ფერი"
                setAllValues={setAllValues}
                name="color_name"
                name1="color_code"
              />
            </div>

            <AddPhoto inputName={"product_imgs"} />

            <div className="w-[200px] max-sm:w-full text-white">
              <MyInput
                name="quantity"
                setAllValues={setAllValues}
                title="ტანსაცმლის მარაგი"
                digit={true}
              />
            </div>
          </div>

          <div className="w-full rounded-[10px] flex justify-end gap-y-[20px]">
            {addprodimgsloader ? (
              <h1 className="bg-[#0e1420] text-white hover:bg-[#335f7a] duration-200 px-[40px] h-[50px] rounded-[10px] cursor-pointer flex items-center justify-center">
                ინფორმაცია ემატება..
              </h1>
            ) : (
              <button
                type="submit"
                className="bg-[#0e1420] text-white hover:bg-[#335f7a] duration-200 px-[40px] h-[50px] rounded-[10px] cursor-pointer flex items-center justify-center"
              >
                გამოქვეყნება
              </button>
            )}
          </div>
        </form>
      )}

      {loaderEachCardData ? (
        <div>
          <Loader1 />
        </div>
      ) : (
        <div className="flex flex-col gap-y-[20px] w-full bg-[#010125] rounded-[10px] px-[20px] py-[30px] max-sm:px-[10px]">
          <p className="text-white">
            {eachProdData.imgs_color?.length !== 0
              ? "ატვირთული ფერები თავის ფოტოებით"
              : "ფოტოები არ არის ატვირთული"}
          </p>

          <div className="flex flex-col gap-y-[10px]">
            {eachProdData.imgs_color?.map((item: any) => (
              <ProductInfoCard
                key={item.id}
                item={item}
                eachProdData={eachProdData}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
