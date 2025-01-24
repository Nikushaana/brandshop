import React, { useEffect, useState } from "react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTiktok,
  BsYoutube,
} from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import MyInput2 from "../MyInput2";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";

export default function ContactUs() {
  const [contact, setcontact] = useState([
    {
      id: 1,
      link: "https://www.instagram.com/brandshop.online_",
      title: "Instagram",
      text: "brandshop.online_",
      icon: <BsInstagram />,
    },
    {
      id: 4,
      link: "https://www.tiktok.com/@brand.shop.online1",
      title: "TikTok",
      text: "brand.shop.online1",
      icon: <BsTiktok />,
    },
    {
      id: 5,
      link: "https://www.facebook.com/groups/1754473448418356",
      title: "Facebook",
      text: "𝐁𝐫𝐚𝐧𝐝 𝐬𝐡𝐨𝐩 𝐨𝐧𝐥𝐢𝐧𝐞",
      icon: <BsFacebook />,
    },
  ]);

  return (
    <div className="flex gap-[60px] w-full max-lg:flex-col ">
      <div className="flex flex-col items-center gap-y-[40px] w-full">
        <div className="w-full flex flex-wrap items-center justify-center gap-[60px]">
          {contact.map((item) => (
            <a
              key={item.id}
              href={`${item.link}`}
              target="_blank"
              className="flex flex-col items-center gap-y-[10px] group"
            >
              <div className="w-[60px] text-[30px] text-white h-[60px] group-hover:rotate-[360deg] duration-300 rounded-full bg-[#1b1b1b] flex items-center justify-center">
                {item.icon}
              </div>
              <h1>{item.title}</h1>
              <p className="text-gray-400">{item.text}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
