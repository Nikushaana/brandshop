import React, { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function DropDown({
  data,
  setAllValues,
  name,
  name1,
  placeholder,
  isFilter,
  firstvalue,
}: any) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [drop, setDrop] = useState<boolean>(false);

  const [active, setActive] = useState<any>();
  const [active1, setActive1] = useState<any>();

  useEffect(() => {
    if (firstvalue) {
      setActive1(firstvalue);
    }
  }, [firstvalue]);

  useEffect(() => {
    if (isFilter) {
      if (setAllValues) {
        setAllValues((prev: any) => ({
          ...prev,
          [name]: active1,
        }));
      }
    }
  }, [active1, isFilter, name]);

  useEffect(() => {
    if (!isFilter) {
      if (setAllValues) {
        setAllValues((prev: any) => ({
          ...prev,
          [name]: active?.color_name,
          [name1]: active?.color_code,
        }));
      }
    }
  }, [active?.color_code, active?.color_name]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      targetRef.current &&
      !(targetRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
      setDrop(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={targetRef} className="relative w-full">
      <div
        onClick={() => {
          setDrop((pre) => !pre);
        }}
        className="h-[40px] select-none bg-white flex items-center cursor-pointer justify-between px-[10px] rounded-[5px] shadow"
      >
        <p className="text-[14px]">{active1 ? active1 : placeholder}</p>
        <MdKeyboardArrowUp
          className={`duration-100 ${drop ? "rotate-180" : ""}`}
        />
      </div>
      <div
        style={{
          height: drop ? (data?.length >= 3 ? 180 : data?.length * 60) : 0,
        }}
        className={`absolute z-[3] top-[45px] bg-white w-full flex flex-col rounded-[8px] shadow-md duration-150  ${
          drop
            ? "overflow-y-scroll py-[10px] showScroll"
            : "overflow-hidden py-0 opacity-0"
        }`}
      >
        {isFilter
          ? data?.map((item: any) => (
              <div
                key={item.id}
                onClick={() => {
                  setActive1(
                    active1 ===
                      (item.brand
                        ? item.brand
                        : item.name
                        ? item.name
                        : item.category)
                      ? ""
                      : item.brand
                      ? item.brand
                      : item.name
                      ? item.name
                      : item.category
                  );
                  setDrop(false);
                }}
                className={`flex items-center px-[10px] justify-between h-[60px] cursor-pointer  ${
                  active1 ===
                  (item.brand
                    ? item.brand
                    : item.name
                    ? item.name
                    : item.category)
                    ? "bg-[#e9e9e9]"
                    : "hover:bg-[#e9e9e9]"
                }`}
              >
                <p className="">
                  {item.brand
                    ? item.brand
                    : item.name
                    ? item.name
                    : item.category}
                </p>
              </div>
            ))
          : data?.map((item: any) => (
              <div
                key={item.id}
                onClick={() => {
                  setActive(item);
                  setActive1(item.color_name);
                  setDrop(false);
                }}
                className="flex items-center px-[10px] justify-between h-[60px] cursor-pointer hover:bg-[#e9e9e9]"
              >
                <p className="">{item.color_name}</p>
                {item.color_code && (
                  <div
                    className={`${`${item.color_code} border-[1px] border-[#010125]`}  w-[20px] h-[20px] rounded-full`}
                  ></div>
                )}
              </div>
            ))}
      </div>
    </div>
  );
}
