import React, { ChangeEvent, useEffect, useState } from "react";

export default function MyInput({
  title,
  firstValue,
  name,
  setAllValues,
  isNumber,
  digit
}: any) {
  const [inputText, setInputText] = useState<string>();

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({ ...prev, [name]: inputText }));
    }
  }, [inputText]);

  useEffect(() => {
    setInputText(firstValue);
  }, [firstValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newText = event.target.value;

    if (isNumber) {
      newText = newText
        .replace(/[^0-9]/g, "")
        .replace(/\s/g, "")
        .replace(/(.{3})/g, "$1 ")
        .trim()
        .slice(0, 11);
    }

    if (digit) {
      newText = newText
        .replace(/[^0-9]/g, "")
    }

    setInputText(newText);
  };

  return (
    <div className="flex flex-col gap-y-[5px]">
      <p>{title}</p>
      <input
        type="text"
        value={inputText}
        name={name}
        onChange={handleInputChange}
        className="outline-none border-[1px] text-[black] border-[gray] rounded-[10px] w-full px-[10px] h-[35px]"
      />
    </div>
  );
}
