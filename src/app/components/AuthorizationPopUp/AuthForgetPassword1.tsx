import { useState } from "react";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import { BiLoader } from "react-icons/bi";

interface Prop {
  setActive: (arg0: string) => void;
}

export default function AuthForgetPassword1({ setActive }: Prop) {
  const [EmailValue, setEmailValue] = useState<string>("");
  const handelChangeEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const [isLoaderEnterMail, setIsLoaderEnterMail] = useState(false);

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleEnterEmail();
    }
  };

  const handleEnterEmail = () => {
    if (EmailValue !== "") {
      setIsLoaderEnterMail(true);
      axiosClient
        .post("auth/restorePassword/code", { email: EmailValue })
        .then((res) => {
          setActive("forgetpass2");
        })
        .catch((err) => {
        })
        .finally(() => {
          setIsLoaderEnterMail(false);
        });
    }
  };

  return (
    <div className="forgotpaswordee  w-full flex flex-col gap-y-[10px] mt-[-3px]">
      <p className="text-center text-[18px]">პაროლის აღდგენა</p>
      <div className="flex flex-col gap-y-[10px]">
        <p className="font-semibold text-[#010125]">ელ-ფოსტა</p>
        <div className="flex flex-col gap-1 ">
          <input
            value={EmailValue}
            onChange={(e) => handelChangeEmailValue(e)}
            type="text"
            onKeyPress={handleInputKeyPress}
            placeholder="e.g john@mail.com"
            className={`w-[100%] h-[50px] text-[#010125] pb-[5px] px-[10px] border-[1px]  ${
              false && " border-red-600"
            } rounded-[10px] outline-none`}
          />
          {false && (
            <p className="font-semibold text-[12px] text-red-600 text-center">
              მიუთითეთ ელ-ფოსტა
            </p>
          )}
        </div>
      </div>
      <div
        onClick={() => handleEnterEmail()}
        className="flex gap-[5px] pt-[3px] items-center w-[100%] h-[50px] rounded-[10px]  justify-center font-semibold text-[18px] cursor-pointer  text-white bg-[black] hover:bg-[#19c74e] duration-200"
      >
        {isLoaderEnterMail ? (
          <BiLoader className="animate-spin text-[25px]" />
        ) : (
          <h1>კოდის გაგზავნა</h1>
        )}
      </div>
    </div>
  );
}
