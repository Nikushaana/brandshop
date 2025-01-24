"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import Whyus from "../header/whyus";
import ProdSlider from "../ProdSlider/ProdSlider";
import Aboutus from "../aboutus/aboutus";
import ContactUs from "../contactus/contactUs";
import SliderBanner from "../header/SliderBanner";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import ScreenWidth from "../screenwidth";
import Image from "next/image";

export default function Home() {
  const {
    section1Ref,
    section2Ref,
    section3Ref,
    gender,
    scrollToSection,
    setSexFilter,
  } = useContext(AxiosForSharingStatesAxiosContext);

  let swiperRef = useRef<SwiperClass>(null!);

  const screenWidth = ScreenWidth();

  const [slideToDisplay, setSlidesToDisplay] = useState(3);

  useEffect(() => {
    if (screenWidth >= 1000) {
      setSlidesToDisplay(3);
    } else if (screenWidth <= 999 && screenWidth >= 480) {
      setSlidesToDisplay(2);
    } else if (screenWidth <= 479 && screenWidth >= 0) {
      setSlidesToDisplay(1);
    }
  }, [screenWidth]);

  return (
    <div className={`flex flex-col gap-y-[120px] max-md:gap-y-[50px] bg-[#f9f9f9]  pb-[150px]`}>
      <div className="px-[50px] max-sm:px-[16px] pt-[50px]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          slidesPerView={slideToDisplay}
          spaceBetween={15}
          loop={true}
          className="w-full h-[400px] max-sm:h-[200px]"
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          speed={1000}
        >
          {gender.map((item: any) => (
            <SwiperSlide
              key={item.id}
              onClick={() => {
                scrollToSection(section1Ref);
                setSexFilter(item.name);
              }}
              className="w-full h-full rounded-[10px] overflow-hidden group cursor-pointer"
            >
              <div key={item.id} className="w-full h-full relative">
                <div className="absolute top-0 left-0 bg-[#0000009d] hover:bg-[#0000006c] duration-200 w-full h-full flex items-center justify-center">
                  <h1 className=" text-white text-[30px]">{item.name}</h1>
                </div>
                <Image
                  src={item.img}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  width={500}
                  height={300}
                  alt=""
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div
        ref={section1Ref}
        className="px-[100px] max-lg:px-[50px] max-sm:px-[16px]  flex flex-col gap-[60px]"
      >
        <ProdSlider title="აქ შეძლებ სასურველი სამოსის მოძიებას" />
      </div>
      <div
        ref={section2Ref}
        className="px-[100px] max-lg:px-[50px] max-sm:px-[16px] "
      >
        <Aboutus />
      </div>
      <div
        ref={section3Ref}
        className="px-[100px] max-lg:px-[50px] max-sm:px-[16px]  "
      >
        <ContactUs />
      </div>
    </div>
  );
}
