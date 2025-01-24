import React, { ChangeEvent, useEffect, useState } from "react";

export default function MyTextArea({
  title,
  firstValue,
  name,
  setAllValues,
  isNumber,
}: any) {
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (setAllValues) {
      setAllValues((prev: any) => ({ ...prev, [name]: inputText }));
    }
  }, [inputText]);

  useEffect(() => {
    setInputText(firstValue);
  }, [firstValue]);

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let newText = event.target.value;

    if (isNumber) {
      newText = newText
        .replace(/[^0-9]/g, "")
        .replace(/\s/g, "")
        .replace(/(.{3})/g, "$1 ")
        .trim()
        .slice(0, 11);
    }

    setInputText(newText);
  };

  return (
    <div className="flex flex-col gap-y-[5px] h-full">
      <p>{title}</p>
      <textarea
        value={inputText}
        name={name}
        onChange={handleInputChange}
        className="outline-none border-[1px] text-[black] border-[gray] rounded-[5px] w-full px-[10px] py-[5px] h-full showScroll"
      />
    </div>
  );
}
