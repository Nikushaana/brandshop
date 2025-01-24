"use client";

import React, { useContext, useRef } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import { BsMouse } from "react-icons/bs";
import Link from "next/link";
import ScreenWidth from "../screenwidth";
import VideoPlayer from "../addphoto/VideoPlayer";
import { RxSpeakerLoud } from "react-icons/rx";
import { RxSpeakerOff } from "react-icons/rx";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";

export default function SliderBanner({ bannerImg, bannerVideo }: any) {
  const { muteVideo, setMuteVideo } = useContext(
    AxiosForSharingStatesAxiosContext
  );

  let swiperRef = useRef<SwiperClass>(null!);

  const scroldown = () => {
    window.scrollTo({ top: 500, left: 0, behavior: "smooth" });
  };

  const screenWidth = ScreenWidth();

  return (
    <div className="bg-[#cacaca] relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect={"fade"}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        navigation={{
          nextEl: ".next",
          prevEl: ".prev",
        }}
        slidesPerView={1}
        loop={true}
        className="sliderbanner items-center h-[100vh] max-md:h-[calc(100vh-60px)] max-tiny:h-[100vh] max flex"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
      >
        {bannerImg.data.map((item: any) => (
          <SwiperSlide key={item.id}>
            <div className="w-full h-full relative">
              {screenWidth > 700 ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                  className="w-full h-full object-cover"
                  alt=""
                />
              ) : (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}/${item.images_mobile.url}`}
                  className="w-full h-full object-cover"
                  alt=""
                />
              )}
              <div
                className="absolute top-0 left-0 h-[100%]  
                 justify-center px-[10%] max-sm:px-[20px]  gap-y-4 flex flex-col "
              >
                <div className="text-[white] flex flex-col gap-y-[50px]">
                  <div className="flex flex-col gap-y-[20px]">
                    <h1 className="text-[42px] max-tiny:text-[30px]">
                      {item.title}
                    </h1>
                    <p className="text-[18px] max-sm:text-[21px] font-normal max-sm:mb-[10px]">
                      {item.description}
                    </p>
                  </div>
                  <Link
                    href={`/${item.link}`}
                    className="h-[50px] w-[160px] text-[15px] bg-[#19c74e] hover:bg-white hover:text-[#19c74e] duration-200 flex items-center justify-center rounded-[30px] cursor-pointer self-start"
                  >
                    სრულად ნახვა
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {bannerVideo.map((items: any) => (
          <SwiperSlide key={items.id}>
            <div className="w-full h-full">
              <VideoPlayer item={items} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        onClick={() => {
          setMuteVideo((pre: any) => !pre);
        }}
        className={`absolute top-[50%] translate-y-[-50%] right-[16px] z-[2] cursor-pointer w-[60px] bg-white px-[5px] py-[5px] rounded-[30px]  duration-200 `}
      >
        <div
          className={`w-[25px] h-[25px] rounded-full flex items-center justify-center bg-[#19c74e] duration-200 ${
            !muteVideo ? "ml-[25px]" : "ml-[0px]"
          }`}
        >
          {!muteVideo ? <RxSpeakerLoud /> : <RxSpeakerOff />}
        </div>
      </div>

      <div
        onClick={() => {
          scroldown();
        }}
        className="absolute cursor-pointer bottom-[40px] left-[50%] flex flex-col items-center gap-y-[10px] translate-x-[-50%] text-white z-[2] "
      >
        <BsMouse className="animate-bounce text-[40px]" />
        <p>ჩამოსქროლე</p>
      </div>
    </div>
  );
}
