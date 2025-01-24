"use client";

import "swiper/css";
import CardStyle1 from "./CardStyle1";
import Loader1 from "../loaders/loader1";
import DropDown from "../DropDown/DropDown";
import { Suspense, useContext, useEffect, useState } from "react";
import MyInput from "../myinput";
import ReactSlider from "react-slider";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import ReactPaginate from "react-paginate";

export default function ProdSlider({ title }: any) {
  const { gender, sexFilter } = useContext(AxiosForSharingStatesAxiosContext);

  const [currentPage, setCurrentPage] = useState(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  const [AllValues, setAllValues] = useState({
    brand: "",
    sale: "",
    sex: "",
    category: "",
  });

  const [yesno, setYesno] = useState([
    {
      id: 1,
      name: "კი",
    },
  ]);

  const [salaryValue, setSalaryValue] = useState([1, 400]);

  const [brands, setBrands] = useState<any>();
  const [categories, setCategories] = useState<any>();

  const [newRenderProductsMain, setNewRenderProductsMain] = useState(null);
  const [ProdDataMain, setProdDataMain] = useState<any>([]);
  const [ProductsLoaderMain, setProductsLoaderMain] = useState<boolean>(true);

  useEffect(() => {
    axiosClient
      .get(`front/brand`)
      .then((res) => {
        setBrands(res.data);
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);
  useEffect(() => {
    axiosClient
      .get(`front/categories`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {})
      .finally(() => {});
  }, []);

  useEffect(() => {
    setProductsLoaderMain(true);
    axiosClient
      .get(
        `front/product?page=${currentPage + 1}&per_page=${20}${
          AllValues.sex
            ? `&sex=${JSON.stringify([
                gender.find((item: any) => item.name === AllValues.sex).id,
              ])}`
            : ""
        }${AllValues.brand ? `&brand=${JSON.stringify([AllValues.brand])}` : ""}
          ${
            salaryValue[0] ? `&minPrice=${JSON.stringify(salaryValue[0])}` : ""
          }${
          salaryValue[1] ? `&maxPrice=${JSON.stringify(salaryValue[1])}` : ""
        }
          
        
        ${
          AllValues.sale
            ? `&discount_price=${AllValues.sale === "კი" ? 1 : 0}`
            : ""
        }${AllValues.category ? `&category=${AllValues.category}` : ""}`
      )
      .then((res) => {
        setProdDataMain(res.data.data);
        setProdwholenum(res.data.total);
      })
      .catch((error) => {})
      .finally(() => {
        setProductsLoaderMain(false);
      });
  }, [
    AllValues.brand,
    AllValues.category,
    AllValues.sale,
    AllValues.sex,
    currentPage,
    gender,
    newRenderProductsMain,
    salaryValue,
  ]);

  const pageCount = Math.ceil(prodwholenum / 20);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <Suspense>
      <div className="flex flex-col gap-[40px] max-sm:gap-y-[30px] w-full">
        <h1 className="text-[25px] max-sm:text-[21px] text-center">{title}</h1>

        <div className="grid grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 max-tiny:grid-cols-1 gap-[20px]">
          <div className="flex flex-col gap-[10px]">
            <h1 className="flex gap-[10px]">ბრენდი</h1>
            <DropDown
              data={brands}
              placeholder="აირჩიე.."
              setAllValues={setAllValues}
              name="brand"
              isFilter={true}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <h1 className="flex gap-[10px]">ფასდაკლება</h1>
            <DropDown
              data={yesno}
              placeholder="აირჩიე.."
              setAllValues={setAllValues}
              name="sale"
              isFilter={true}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <h1 className="flex gap-[10px]">ვისთვის?</h1>
            <DropDown
              data={gender}
              placeholder="აირჩიე.."
              setAllValues={setAllValues}
              name="sex"
              firstvalue={sexFilter}
              isFilter={true}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <h1 className="flex gap-[10px]">კატეგორია</h1>
            <DropDown
              data={categories}
              placeholder="აირჩიე.."
              setAllValues={setAllValues}
              name="category"
              isFilter={true}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <h1 className="flex gap-[10px]">
              ფასი:
              <span className="font-semibold">
                ₾{salaryValue[0]} - ₾{salaryValue[1]}
              </span>
            </h1>
            <div className="w-full flex flex-col items-center">
              <ReactSlider
                className="horizontal-slider w-full h-[40px] flex items-center  "
                thumbClassName="w-[25px] h-[25px] bg-[black] rounded-[5px] outline-none text-[1px] text-white flex items-center justify-center cursor-pointer"
                trackClassName="example-track bg-[black]"
                value={salaryValue}
                max={400}
                min={1}
                ariaLabel={["Lower thumb", "Upper thumb"]}
                ariaValuetext={(state: any) => `Thumb value ${state.valueNow}`}
                renderThumb={(props: any, state: any) => (
                  <div {...props}>{state.valueNow}</div>
                )}
                onChange={(value: any, index: any) => setSalaryValue(value)}
                pearling
                minDistance={6}
              />
            </div>
          </div>
        </div>

        <p className="text-[14px]">
          მოიძებნა {prodwholenum ? prodwholenum : 0}
        </p>

        {ProductsLoaderMain ? (
          <div className="h-[270px] flex flex-col items-center justify-center gap-y-[20px] rounded-[15px] ">
            <Loader1 />
            იძებნება სამოსი..
          </div>
        ) : (
          <div>
            {ProdDataMain?.length === 0 ? (
              <p>სამოსი არ მოიძებნა..</p>
            ) : (
              <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 max-tiny:grid-cols-1 gap-[30px] ">
                {ProdDataMain.map((item: any) => (
                  <CardStyle1 key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        )}
        {prodwholenum > 20 && (
          <div className="py-[50px] flex justify-center">
            <ReactPaginate
              breakLabel="..."
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="< previous"
              renderOnZeroPageCount={null}
              breakLinkClassName={"font-bold text-gray-400"}
              breakClassName={"w-8 h-8 flex items-center justify-center"}
              //main container
              containerClassName={`flex items-center gap-1`}
              //single page number
              pageLinkClassName={`w-[40px] h-[40px] text-md  border border-[#010125]
           flex items-center justify-center rounded-lg`}
              //previous page number
              previousLinkClassName={`hidden`}
              //next page number
              nextLinkClassName={`hidden`}
              //active page
              activeLinkClassName={"bg-[#010125] !important text-white"}
              forcePage={currentPage}
            />
          </div>
        )}
      </div>
    </Suspense>
  );
}
