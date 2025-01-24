"use client";

import React, { Suspense, useContext, useEffect, useState } from "react";
import { ProductsAxiosContext } from "../../../../useContexts/ProductsAxios";
import Loader1 from "../loaders/loader1";
import EachProdCardStyle from "./EachProdCardStyle";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import ReactPaginate from "react-paginate";

export default function AdminProductsContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const [prodwholenum, setProdwholenum] = useState<any>();

  const [newRenderProductsMain, setNewRenderProductsMain] = useState(null);
  const [ProdDataMain, setProdDataMain] = useState<any>([]);
  const [ProductsLoaderMain, setProductsLoaderMain] = useState<boolean>(true);

  useEffect(() => {
    setProductsLoaderMain(true);
    axiosClient
      .get(`front/product?page=${currentPage + 1}&per_page=${20}`)
      .then((res) => {
        setProdDataMain(res.data.data);
        setProdwholenum(res.data.total);
      })
      .catch((error) => {})
      .finally(() => {
        setProductsLoaderMain(false);
      });
  }, [currentPage, newRenderProductsMain]);

  const pageCount = Math.ceil(prodwholenum / 20);

  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected);
  };

  return (
    <Suspense>
      <div className="flex flex-col gap-y-[20px]">
        <h1 className="text-[24px] max-lg:ml-[60px] max-md:text-[20px] max-sm:text-[18px]">
          ტანსაცმელი სულ: {prodwholenum}
        </h1>
        <div>
          {ProductsLoaderMain ? (
            <div className="pt-[50px]">
              <Loader1 />
            </div>
          ) : (
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-2 max-tiny:grid-cols-1 gap-[20px] max-tiny:gap-[16px]">
              {ProdDataMain.map((item: any) => (
                <EachProdCardStyle
                  key={item.id}
                  item={item}
                  setNewRenderProducts={setNewRenderProductsMain}
                />
              ))}
            </div>
          )}
        </div>
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
