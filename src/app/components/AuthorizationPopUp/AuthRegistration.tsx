import { useState } from "react";
import {
  BsEye,
  BsEyeSlash,
  BsGeoAlt,
  BsLock,
  BsPerson,
  BsTelephone,
} from "react-icons/bs";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import Loader1 from "../loaders/loader1";
import { BiLoader } from "react-icons/bi";

interface Prop {
  setActive: (arg0: string) => void;
}

export default function AuthRegistration({ setActive }: Prop) {
  const [show, setshow] = useState(false);
  const handleshow = () => {
    setshow((pre) => !pre);
  };

  const [isLoader, setIsLoader] = useState(false);

  const [isErrorNotFull, setIsErrorNotFull] = useState(false);
  const [isErrorGmailNotValid, setIsErrorGmailNotValid] = useState(false);
  const [isErrorMobValidValue, setIsErrorMobValidValue] = useState(false);
  const [isErrorPassRePassSame, setIsErrorPassRePassSame] = useState(false);
  const [isErrorPassRePassLessSix, setIsErrorPassRePassLessSix] =
    useState(false);

  const [NameValue, setNameValue] = useState<string>("");
  const [LastNameValue, setLastNameValue] = useState<string>("");
  const [GmailValue, setGmailValue] = useState<string>("");
  const [TellNumberValue, setTellNumberValue] = useState<string>("");
  const [PasswordValue, setPasswordValue] = useState<string>("");
  const [RePasswordValue, setRePasswordValue] = useState<string>("");

  const handelChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };
  const handelChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameValue(e.target.value);
  };
  const handelChangeGmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGmailValue(e.target.value);
  };
  const handelChangeTellNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTellNumberValue(
      e.target.value
        .replace(/[^0-9]/g, "")
        .replace(/\s/g, "")
        .replace(/(.{3})/g, "$1 ")
        .trim()
        .slice(0, 11)
    );
  };
  const handelChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };
  const handelChangeRePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePasswordValue(e.target.value);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handelSubmit();
    }
  };

  const handelSubmit = () => {
    setIsLoader(true);
    setIsErrorGmailNotValid(false);
    setIsErrorPassRePassSame(false);
    setIsErrorMobValidValue(false);
    setIsErrorNotFull(false);
    if (
      NameValue &&
      LastNameValue &&
      GmailValue &&
      TellNumberValue &&
      PasswordValue &&
      RePasswordValue
    ) {
      if (TellNumberValue.length === 11) {
        if (PasswordValue === RePasswordValue) {
          axiosClient
            .post("/auth/singUp", {
              fname: NameValue,
              lname: LastNameValue,
              email: GmailValue,
              phone: TellNumberValue,
              password: PasswordValue,
              password_confirmation: RePasswordValue,
            })
            .then((response) => {
              setNameValue("");
              setLastNameValue("");
              setGmailValue("");
              setTellNumberValue("");
              setPasswordValue("");
              setRePasswordValue("");
              setActive("signin");
            })
            .catch((error) => {
              setIsLoader(false);
              if (error.response.data.error.email) {
                setIsErrorGmailNotValid(true);
              }
              if (error.response.data.error.password) {
                setIsErrorPassRePassLessSix(true);
              }
              if (error.response.data.error.phone) {
                setIsErrorMobValidValue(true);
              }
            })
            .finally(() => {
              setIsLoader(false);
            });
        } else {
          setIsErrorPassRePassSame(true);
          setIsLoader(false);
        }
      } else {
        setIsErrorMobValidValue(true);
        setIsLoader(false);
      }
    } else {
      setIsErrorNotFull(true);
      setIsLoader(false);
    }
  };

  return (
    <div className="w-[100%] flex flex-col gap-[10px]">
      <p className="text-[15px] mb-[15px] text-[#3f3f3f] font-semibold">
        გაიარე რეგისტრაცია
      </p>
      {isErrorNotFull && (
        <p className="text-[red] text-center text-[14px]">შეავსე ყველა ველი</p>
      )}
      <div className="flex gap-[10px]">
        <div
          className={`flex border-[1px] hover:border-[#19c74e] rounded-[5px] w-[50%] pr-[7px] h-[50px] text-gray-500 items-center ${
            isErrorNotFull && NameValue.length === 0 && "border-[red]"
          }`}
        >
          <div className="h-[100%] w-[40px] rounded-l-[16px] flex justify-center items-center">
            <BsPerson className="text-[20px]" />
          </div>
          <input
            onChange={(e) => handelChangeName(e)}
            onKeyPress={handleInputKeyPress}
            value={NameValue}
            name="firstName"
            type="text"
            className="select-none outline-none w-[80%]"
            placeholder="სახელი"
          />
        </div>
        <div
          className={`flex border-[1px] hover:border-[#19c74e] rounded-[5px] w-[50%] pr-[7px] h-[50px] text-gray-500 items-center ${
            isErrorNotFull && LastNameValue.length === 0 && "border-[red]"
          }`}
        >
          <div className="h-[100%] w-[40px] rounded-l-[16px] flex justify-center items-center">
            <BsPerson className="text-[20px]" />
          </div>
          <input
            onChange={(e) => handelChangeLastName(e)}
            onKeyPress={handleInputKeyPress}
            value={LastNameValue}
            name="surname"
            type="text"
            className="select-none outline-none  w-[80%]"
            placeholder="გვარი"
          />
        </div>
      </div>
      {isErrorGmailNotValid && (
        <p className="text-[red] text-center text-[14px]">
          ელ-ფოსტის სტრუქტურა არასწორია ან უკვე დაკავებულია
        </p>
      )}
      <div
        className={`flex border-[1px] hover:border-[#19c74e] rounded-[5px] w-[100%] pr-[7px] h-[50px] text-gray-500 items-center ${
          isErrorNotFull && GmailValue.length === 0 && "border-[red]"
        }`}
      >
        <div className="h-[100%] w-[40px] rounded-l-[16px] flex justify-center items-center">
          <p>@</p>
        </div>
        <input
          onChange={(e) => handelChangeGmail(e)}
          onKeyPress={handleInputKeyPress}
          value={GmailValue}
          type="text"
          name="email"
          className="select-none outline-none  w-[80%]"
          placeholder="ელ-ფოსტა"
        />
      </div>
      {isErrorMobValidValue && (
        <p className="text-[red] text-center text-[14px]">
          ნომრის სტრუქტურა არასწორია ან უკვე დაკავებულია
        </p>
      )}
      <div
        className={`flex border-[1px] hover:border-[#19c74e] rounded-[5px] w-[100%] pr-[7px] h-[50px] text-gray-500 items-center ${
          (isErrorNotFull && TellNumberValue.length === 0) ||
          (isErrorMobValidValue &&
            TellNumberValue.length < 11 &&
            "border-[red]")
        }`}
      >
        <div className="h-[100%] w-[40px] rounded-l-[16px] flex justify-center items-center">
          <BsTelephone className="text-[18px]" />
        </div>
        <input
          onChange={(e) => handelChangeTellNumber(e)}
          onKeyPress={handleInputKeyPress}
          value={TellNumberValue}
          type="text"
          name="mobNumber"
          className="select-none outline-none  w-[80%]"
          placeholder="ტელ ნომერი"
        />
      </div>

      {isErrorPassRePassLessSix && (
        <p className="text-[red] text-center text-[14px]">
          პაროლი უნდა შეიცავდეს არანაკლებ 6 სიმბოლოს
        </p>
      )}
      <div className="flex flex-col gap-[10px]">
        <div
          className={`flex border-[1px] hover:border-[#19c74e] rounded-[5px] w-[100%] pr-[7px] h-[50px] text-gray-500 items-center ${
            (isErrorNotFull && PasswordValue.length === 0) ||
            (isErrorPassRePassLessSix &&
              RePasswordValue.length < 6 &&
              "border-[red]")
          }`}
        >
          <div className="h-[100%] w-[40px] rounded-l-[16px] flex justify-center items-center">
            <BsLock className="text-[20px]" />
          </div>
          <input
            onChange={(e) => handelChangePassword(e)}
            onKeyPress={handleInputKeyPress}
            value={PasswordValue}
            type={show ? "text" : "password"}
            name="passwordValue"
            id="password"
            className="select-none outline-none  w-[80%]"
            placeholder="პაროლი"
          />
          <div onClick={handleshow} className="text-[20px] text-[#010125]">
            {show ? (
              <BsEye className="cursor-pointer" />
            ) : (
              <BsEyeSlash className="cursor-pointer" />
            )}
          </div>
        </div>
        {isErrorPassRePassSame && (
          <p className="text-[red] text-center text-[14px]">
            გაიმეორე პაროლი სწორად
          </p>
        )}
        <div
          className={`flex border-[1px] hover:border-[#19c74e] rounded-[5px] w-[100%] pr-[7px] h-[50px] text-gray-500 items-center ${
            (isErrorNotFull && RePasswordValue.length === 0) ||
            (((isErrorPassRePassSame && RePasswordValue !== PasswordValue) ||
              (isErrorPassRePassLessSix && RePasswordValue.length < 6)) &&
              "border-[red]")
          }`}
        >
          <div className="h-[100%] w-[40px] rounded-l-[16px] flex justify-center items-center">
            <BsLock className="text-[20px]" />
          </div>
          <input
            onChange={(e) => handelChangeRePassword(e)}
            onKeyPress={handleInputKeyPress}
            value={RePasswordValue}
            type={show ? "text" : "password"}
            name="passwordValue2"
            id="password"
            className="select-none outline-none  w-[80%]"
            placeholder="გაიმეორე პაროლი"
          />
          <div onClick={handleshow} className="text-[20px] text-[#010125]">
            {show ? (
              <BsEye className="cursor-pointer" />
            ) : (
              <BsEyeSlash className="cursor-pointer" />
            )}
          </div>
        </div>
      </div>
      <div>
        <div
          onClick={() => handelSubmit()}
          className="w-[100%] h-[60px] cursor-pointer flex items-center justify-center select-none bg-[black] hover:bg-[#19c74e] duration-100 text-white rounded-[3px]"
        >
          {isLoader ? (
            <div className="">
              <BiLoader className="animate-spin text-[24px]" />
            </div>
          ) : (
            <h1>დადასტურება</h1>
          )}
        </div>
      </div>
    </div>
  );
}
