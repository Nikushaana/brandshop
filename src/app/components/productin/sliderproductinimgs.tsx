"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import Image from "next/image";
import ScreenWidth from "../screenwidth";
import { BsChevronLeft, BsChevronRight, BsImage } from "react-icons/bs";

export default function ProdInSlider2({
  inEachProdData,
  activeColor_imgs,
}: any) {
  let swiperRef = useRef<SwiperClass>(null!);
  const screenWidth = ScreenWidth();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>(null!);
  const cvladi: {} = {
    "--swiper-navigation-color": "transparent",
    "--swiper-pagination-color": "#fff",
  };

  return (
    <div className="w-full h-full">
      {/* {inEachProdData?.imgs_color.length !== 0 ? ( */}
      <div className="flex flex-col w-full h-full gap-[10px] max-xl:gap-[20px]">
        <div className="w-full h-[calc(100%-110px)] max-sm:h-[calc(100%-90px)]">
          <Swiper
            style={cvladi}
            loop={true}
            slidesPerView={1}
            navigation={true}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2 h-full w-full"
          >
            {/* {inEachProdData?.imgs_color.length &&
                inEachProdData?.imgs_color[activeColor_imgs]?.photos.map(
                  (item: any) => (
                    <SwiperSlide key={item.id}>
                      <div className="h-full rounded-[10px] w-full bg-white">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            borderRadius: "8px",
                          }}
                          width={600}
                          height={600}
                          alt=""
                        />
                      </div>
                    </SwiperSlide>
                  )
                )} */}
            {[1, 2, 3, 4].map((item) => (
              <SwiperSlide key={item}>
                <div className="h-full rounded-[10px] w-full bg-white">
                  <Image
                    // src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                    src="/images/man.avif"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                    width={600}
                    height={600}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex relative group">
          <button
            className={`absolute max-md:hidden top-[50%] translate-y-[-50%] group-hover:border-[1px] group-hover:shadow-md left-[60px] group-hover:left-[20px] z-10 group-hover:bg-[white]  duration-100 rounded-full h-[50px] w-[50px] max-sm:h-[40px] max-sm:w-[40px] flex justify-center items-center ${
              inEachProdData?.length === 0 ? "hidden" : "flex"
            }`}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <BsChevronLeft className="group-hover:text-black text-transparent text-[24px]" />
          </button>
          <button
            className={`absolute max-md:hidden top-[50%] translate-y-[-50%] group-hover:border-[1px] group-hover:shadow-md right-[60px] group-hover:right-[20px] z-10 group-hover:bg-[white] duration-100 rounded-full h-[50px] w-[50px] max-sm:h-[40px] max-sm:w-[40px] flex justify-center items-center ${
              inEachProdData?.length === 0 ? "hidden" : "flex"
            }`}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <BsChevronRight className="group-hover:text-black text-transparent  text-[24px]" />
          </button>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            direction="horizontal"
            spaceBetween={10}
            slidesPerView={screenWidth >= 500 ? 5 : 4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper w-full h-[100px] max-sm:h-[80px]"
          >
            {/* {inEachProdData?.imgs_color.length &&
              inEachProdData?.imgs_color[activeColor_imgs]?.photos.map(
                (item: any) => (
                  <SwiperSlide key={item.id}>
                    <div className="w-full h-full bg-white shadow-md border-[1px] cursor-pointer rounded-[10px] p-[3px]">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          borderRadius: "8px",
                        }}
                        width={500}
                        height={300}
                        alt=""
                      />
                    </div>
                  </SwiperSlide>
                )
              )} */}

              {[1, 2, 3, 4].map((item) => (
              <SwiperSlide key={item}>
                <div className="h-full rounded-[10px] w-full bg-white">
                  <Image
                    // src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                    src="/images/man.avif"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                    width={600}
                    height={600}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* ) : (
        <div className="w-full h-full rounded-[10px] bg-[#010125] text-white flex flex-col gap-y-[10px] items-center justify-center">
          <BsImage className="text-[30px]" />
          <p>ფოტოები არ მოიძებნა</p>
        </div>
      )} */}
    </div>
  );
}
