import Image from "next/image";
import React from "react";
import { BsDot } from "react-icons/bs";

export default function Aboutus() {
  return (
    <div className="flex max-lg:flex-col items-start max-lg:items-center justify-between gap-[30px]">
      <div className="w-[40%] h-[500px] max-lg:h-[300px] max-lg:w-[400px] max-tiny:h-[260px] max-tiny:w-full relative">
        <Image
          src={"/images/alllogos.jpg"}
          alt={""}
          sizes="500px"
          fill
          style={{
            objectFit: "contain",
          }}
        />
      </div>
      <div className="flex flex-col gap-y-[20px] w-[50%] max-lg:w-full">
        <h1 className="text-[25px] max-sm:text-[21px] max-sm:w-full">
          ჩვენს შესახებ
        </h1>
        <p>
          BrandShop - აქ შეიძენთ მაღალი ხარისხის ორიგინალ ტანსაცმელს ევროპიდან
          საუკეთესო ფასებში. <br />
          ჩვენ ვუზრუნველყოფთ მიწოდებას ცნობილი ევროპული ბრენდებისგან, როგორიცაა
          Zara, Mango, Bershka, Stradivarius, Pull&Bear და სხვა, პირდაპირ
          საქართველოში. <br />
          გვაქვს კურიერული მომსახურება, რომლის დახმარებითაც შესაძლებელია
          თქვენთვის სასურველი სამოსის თქვენს მიერ მითითებულ მისამართზე მოტანა.
          ამის საფასური თბილისის მასშტაბით 5 ლარია, ხოლო რეგიონებში 10 ლარი, რის გადახდასაც კურიერთან შეძლებთ.
          <br />
        </p>
        <h1>მოგეწონათ სამოსი?</h1>
        <div className="flex flex-col gap-y-[5px]">
          <p className="flex items-start gap-[5px]">
            <BsDot className="shrink-0" />
            სამოსის ფოტოზე დაკლიკებით შედით მის შიდა გვერდზე სადაც მასზე
            ინფორმაციას სრულად ნახავთ.
          </p>
          <p className="flex items-start gap-[5px]">
            <BsDot className="shrink-0" />
            მიუთითეთ სასურველი რაოდენობა და დააჭირეთ ღილაკს {`"დამატება"`}.
          </p>
          <p className="flex items-start gap-[5px]">
            <BsDot className="shrink-0" />
            ვებ გვერდის თავში, კალათის სიმბოლოზე დაჭერით ნახავთ კალათაში
            დამატებულ თქვენს სამოსებს.
          </p>
          <p className="flex items-start gap-[5px]">
            <BsDot className="shrink-0" />
            შეკვეთის გასაგრძელებლად დააჭირეთ ღილაკს {`"განაგრძე შეკვეთა"`}.
          </p>
          <p className="flex items-start gap-[5px]">
            <BsDot className="shrink-0" />
            შეავსეთ მითითებული საკონტაქტო ინფორმაციის ყველა ველი შემდეგ კი
            დააჭირეთ ღილაკს {`"შეკვეთა"`}.
          </p>
          <p className="flex items-start gap-[5px]">
            <BsDot className="shrink-0" />
            შეკვეთა გამოიგზავნება ჩვენთან, ჩვენ კი დაგიკავშირდებით შეკვეთის
            გადასამოწმებლად.
          </p>
          <p className="flex items-start gap-[5px]">
            <BsDot className="shrink-0" />
            საჭირო იქნება სამოსის შესაბამისად წინასწარი გარკვეული თანხის
            გადახდა.
          </p>
          <p className="flex items-start gap-[5px]">
            <BsDot className="shrink-0" />
            სამოსის ჩამოსატანად საჭიროა 10 სამუშაო დღე.
          </p>
          <p className="flex items-start gap-[5px]">
            <BsDot className="shrink-0" />
            სამოსის ჩაბარების შემდეგ კი გადაიხდით დარჩენილ თანხას.
          </p>
        </div>
      </div>
    </div>
  );
}
