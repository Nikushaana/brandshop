"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, EffectFade } from "swiper/modules";
import Loader1 from "../loaders/loader1";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import CardStyle1 from "./CardStyle1";
import ScreenWidth from "../screenwidth";

export default function ProdSlider2({ productInfo, title }: any) {
  let swiperRef = useRef<SwiperClass>(null!);

  const screenWidth = ScreenWidth();
  const [slidesPerView, setSlidesPerView] = useState(6);

  useEffect(() => {
    if (screenWidth >= 1540) {
      setSlidesPerView(5);
    } else if (screenWidth <= 1540 && screenWidth >= 1200) {
      setSlidesPerView(4);
    } else if (screenWidth <= 1200 && screenWidth >= 900) {
      setSlidesPerView(3);
    } else if (screenWidth <= 900 && screenWidth >= 570) {
      setSlidesPerView(2);
    } else if (screenWidth <= 570) {
      setSlidesPerView(1);
    }
  }, [screenWidth]);

  return (
    <div className="flex flex-col gap-[60px] w-full relative">
      <div className={`flex items-center justify-center`}>
        <h1 className="text-[25px] max-sm:text-[21px] max-sm:w-full">
          {title}
        </h1>
      </div>

      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={slidesPerView}
        spaceBetween={20}
        loop={true}
        className="w-full items-stretch"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        speed={1200}
      >
        {/* {productInfo.data?.map((item: any) => ( */}
          {[1,2,3,4,5,6].map((item)=>(
          <SwiperSlide key={item}>
            <CardStyle1 slider={true} />
          </SwiperSlide>
          ))}
        {/* ))} */}
      </Swiper>
      {/* {productInfo.data?.length > 4 && ( */}
        <div className="flex gap-[10px] items-center max-md:hidden">
          <button
            className={`absolute top-[50%] translate-y-[-50%] left-[20px] z-[2] w-[60px] h-[40px] flex items-center justify-center text-[22px] bg-white hover:shadow-md duration-150 border-[1px] rounded-full`}
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <BiChevronLeft className="" />
          </button>
          <button
            className={`absolute top-[50%] translate-y-[-50%] right-[20px] z-[2] w-[60px] h-[40px] flex items-center justify-center text-[22px] bg-white hover:shadow-md  duration-150 border-[1px] rounded-full
            `}
            onClick={() => swiperRef.current?.slideNext()}
          >
            <BiChevronRight className="" />
          </button>
        </div>
      {/* )} */}
    </div>
  );
}
