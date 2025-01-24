import React, { ChangeEvent, useEffect, useState } from "react";

export default function MyInput2({
  placeholder,
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

    setInputText(newText);
  };

  return (
    <div>
      <input
        type="text"
        value={inputText}
        name={name}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full border-b-[1px] border-[white] bg-transparent  text-[14px] h-[50px] outline-none"
      />
    </div>
  );
}
