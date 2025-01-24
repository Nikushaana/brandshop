import React, { useContext } from "react";

export default function Calculator({
  setCheckout,
  checkout,
  lastPrice,
  isLoaderAddOrders,
}: any) {
  return (
    <div className="flex flex-col gap-y-[15px] w-full border-[1px] shadow-md p-[20px] rounded-[20px]">
      <div className="flex items-center justify-between text-[20px]">
        <p className="">ჯამი</p>
        <p>{lastPrice}₾</p>
      </div>

      <p className="text-red-500 text-[14px]">
        შეკვეთის დასრულების შემდეგ დაგიკავშირდებით მითითებულ ნომერზე ან
        ინსტაგრამის მისამართზე და დავაზუსტებთ შეკვეთის ინფორმაციას, თანხის
        გადმორიცხვასაც შემდეგ მოახდენთ ჩვენს ანგარიშის ნომერზე.
      </p>

      <div className="flex justify-center">
        {!checkout && (
          <p
            onClick={() => {
              setCheckout(true);
            }}
            className="px-[40px] h-[40px] select-none rounded-full bg-[#010125] hover:bg-gray-600 duration-200 flex items-center justify-center text-white text-[14px] cursor-pointer"
          >
            განაგრძე შეკვეთა
          </p>
        )}

        {checkout &&
          (isLoaderAddOrders ? (
            <p className="px-[40px] h-[40px] select-none rounded-full bg-gray-600 flex items-center text-white text-[14px] cursor-pointer">
              შეკვეთა ემატება..
            </p>
          ) : (
            <button
              type="submit"
              className="px-[40px] h-[40px] select-none rounded-full bg-[#010125] hover:bg-gray-600 flex items-center text-white text-[14px] cursor-pointer"
            >
              შეკვეთა
            </button>
          ))}
      </div>
    </div>
  );
}
