import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsImage } from "react-icons/bs";

export default function AddPhoto({
  name,
  handleNewPhotos = null,
  makeEmpty,
  handleMakeEmpty,
  setSelectedPhotoIndex = null,
  inputName,
}: any) {
  const [multipleFiles, setMultipleFiles] = useState([]);
  const inputElement = useRef(null);

  const handleMultipleFilesChange = (event: any) => {
    setMultipleFiles(Array.from(event.target.files));
  };

  const handleRemovePhoto = (index: any) => {
    setMultipleFiles((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  const handleOpenInput = () => (inputElement.current as any).click();

  useEffect(() => {
    if (makeEmpty) {
      setMultipleFiles([]);
      handleMakeEmpty(false);
    }
  }, [makeEmpty, handleMakeEmpty]);

  return (
    <div className="flex flex-col gap-y-[10px]">
      <div className="my-1">
        <p
          onClick={handleOpenInput}
          className={`border-dashed border-[3px] text-white border-gray-300 flex items-center justify-center cursor-pointer w-[200px] h-[60px] rounded-[10px] hover:text-[18px] duration-200`}
        >
          ატვირთე ფოტოები
        </p>
        <input
          name={inputName}
          ref={inputElement}
          multiple
          className="hidden"
          type="file"
          onChange={handleMultipleFilesChange}
          accept={[
            "image/png",
            "image/jpg",
            "image/jpeg",
            "image/bmp",
            "image/webp",
          ].join(" ")}
        />
      </div>

      <div className="grid grid-cols-5 max-2xl:grid-cols-4 max-xl:grid-cols-3 max-sm:grid-cols-2 gap-4 items-center">
        {multipleFiles &&
          multipleFiles.map((single, index) => (
            <div
              key={index}
              className="relative group flex items-center w-full h-[150px] rounded-[10px]"
            >
              <div className="flex items-center w-full h-full bg-gray-200 rounded-[10px] shadow-md shadow-gray-500">
                <img
                  src={URL.createObjectURL(single)}
                  className={`w-full h-full object-contain rounded-[6px]`}
                  alt=""
                />
              </div>
              <div
                className="rounded-full absolute group-hover:flex max-lg:flex top-[7px] right-[10px] w-8 h-8 bg-[red] max-md:flex cursor-pointer hidden items-center justify-center"
                onClick={() => handleRemovePhoto(index)}
              >
                <AiOutlineClose className="text-gray-100 text-2xl" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
