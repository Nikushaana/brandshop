import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";
import { FaVideo } from "react-icons/fa6";

export default function AddVideo({
  handleNewPhotos = null,
  makeEmpty,
  handleMakeEmpty,
  inputName,
}: any) {
  const [multipleFiles, setMultipleFiles] = useState<any>([]);
  const inputElement = useRef<HTMLInputElement>(null);

  const handleMultipleFilesChange = (event: any) => {
    let tmpVideoList:any = [];
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i].type.startsWith("video/")) {
        tmpVideoList.push(event.target.files[i]);
      }
    }
    setMultipleFiles((prev: any) => tmpVideoList);
  };

  const HandleRemovePhoto = (index: any) => {
    let tmp = [...multipleFiles];
    tmp.splice(index, 1);
    setMultipleFiles(tmp);
  };

  const handleOpenInput = () => {
    inputElement.current?.click();
  };

  useEffect(() => {
    if (multipleFiles != null && handleNewPhotos !== null) {
      handleNewPhotos(multipleFiles);
    }
  }, [multipleFiles]);

  useEffect(() => {
    if (makeEmpty) {
      setMultipleFiles([]);
      handleMakeEmpty(false);
    }
  }, [makeEmpty]);

  return (
    <div className="flex flex-col gap-y-[10px]">
      <div className="my-1">
        <p
          onClick={handleOpenInput}
          className={`border-dashed border-[3px] text-white border-gray-300 flex items-center justify-center cursor-pointer w-[200px] h-[60px] rounded-[10px] hover:text-[18px] duration-200`}
        >
          ატვირთე ვიდეო
        </p>
        <input
          name={inputName}
          ref={inputElement}
          multiple
          className="hidden"
          type="file"
          onChange={handleMultipleFilesChange}
          accept="video/mp4,video/mkv,video/avi,video/mov"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-center">
        {multipleFiles ? (
          multipleFiles.map((single: any, index: any) => {
            let fileUrl = URL.createObjectURL(single);
            return (
              <div
                key={index}
                className="relative group flex items-center w-full h-[150px] rounded-[10px]"
              >
                <div className="flex items-center w-full h-full bg-gray-200 rounded-[10px] shadow-md shadow-gray-500">
                  <video
                    src={fileUrl}
                    className="w-full h-full object-cover rounded-[6px]"
                    controls
                  />
                </div>
                <div
                  className="rounded-full absolute group-hover:flex max-lg:flex top-[7px] right-[10px] w-8 h-8 bg-[red] max-md:flex cursor-pointer hidden items-center justify-center"
                  onClick={() => HandleRemovePhoto(index)}
                >
                  <AiOutlineClose className="text-gray-100 text-2xl" />
                </div>
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
