"use client";

import React, { useState } from "react";
import { TbHandFinger } from "react-icons/tb";
import { FaChargingStation } from "react-icons/fa";
import { FaHands } from "react-icons/fa";
import { TbBulbFilled } from "react-icons/tb";
import { MdVerified } from "react-icons/md";
import { GiArmorUpgrade } from "react-icons/gi";

export default function Whyus() {
  const [advantages, setAdvantages] = useState([
    {
      id: 1,
      icon: <FaHands />,
      text: "კომფორტული",
    },
    {
      id: 2,
      icon: <TbHandFinger />,
      text: "სენსორული მექანიზმი",
    },
    {
      id: 3,
      icon: <FaChargingStation />,
      text: "დატენვადი ელემენტი",
    },
    {
      id: 4,
      icon: <GiArmorUpgrade />,
      text: "უჟანგავი მეტალის კორპუსი",
    },
    {
      id: 5,
      icon: <TbBulbFilled />,
      text: "ინოვაციური დიზაინი",
    },
    {
      id: 6,
      icon: <MdVerified />,
      text: "ხარისხის გარანტია",
    },
  ]);
  return (
    <div className="flex max-lg:flex-col-reverse py-[20px] items-center justify-between gap-[30px] bg-[#eaecef] px-[100px] max-lg:px-[50px] max-sm:px-[16px] ">
      <div className="flex flex-col  gap-y-[20px] w-[50%] max-lg:w-full max-lg:pb-[50px]">
        <h1 className="text-[25px] max-sm:text-[21px] max-sm:w-full">
          რატომ ჩვენ
        </h1>
        <p>
          ჩვენ გთავაზობთ ხარისხის გარანტიას, რომელიც 3 თვის ვადითაა განსაზღვრული,
          უფასო საკურიერო მომსახურეობით მთელი საქართველოს მასშტაბით. ჩვენი
          პროდუქცია გეხმარებათ შეინარჩუნოთ სისუფთავე ხელის ერთი პატარა
          მოძრაობით. კონკრეტულად პროდუქტი კი დამზადებულია უჟანგავი მეტალისგან,
          FRP თითის ანაბეჭდის საწინააღმდეგო შრით, აქვს დატენვადი ლითიუმის
          ელემენტი და შიდა ურნა. ურნის თავსახური გახსნის სიჩქარე 3 წამია,
          იხურება 5 წამის შემდეგ. სენსორის აქტიური მგრძნობელობის არეალი 15-25
          სმ-ია.
        </p>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
          {advantages.map((item) => (
            <div key={item.id} className="flex group items-center gap-[15px]">
              <div className="w-[80px] h-[80px] max-md:w-[60px] max-md:h-[60px] rounded-full flex items-center justify-center text-white bg-[#19c74e]">
                <p className="group-hover:text-[35px] text-[30px] max-md:text-[25px] duration-100">
                  {item.icon}
                </p>
              </div>
              <p className="font-bold text-[15px]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[40%] max-lg:w-full max-lg:h-[400px] ">
        <img
          src="/images/righttrash.png"
          alt=""
          className="w-full h-full object-contain "
        />
      </div>
    </div>
  );
}
