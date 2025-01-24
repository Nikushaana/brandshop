"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import axiosClient from "../../../../useContexts/AxiosClient/AxiosClient";
import AddPhoto from "@/app/components/addphoto/AddPhoto";
import MyInput from "@/app/components/myinput";
import Loader1 from "@/app/components/loaders/loader1";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";
import AddVideo from "@/app/components/addphoto/AddVideo";
import VideoPlayer from "@/app/components/addphoto/VideoPlayer";

export default function Page() {
  const { newRenderBanner, setNewRenderBanner } = useContext(
    AxiosForSharingStatesAxiosContext
  );
  const [isLoading, setIsLoading] = useState(false);
  const [bannerImgInfo, setBannerImgInfo] = useState<any>([]);
  const [bannerVideoInfo, setBannerVideoInfo] = useState<any>([]);

  useEffect(() => {
    setIsLoading(true);
    axiosClient
      .get("front/photos?type=5")
      .then((res) => {
        setBannerImgInfo(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {});
    axiosClient
      .get("front/videos?type=5")
      .then((res) => {
        setBannerVideoInfo(res.data);
        setIsLoading(false);
      })
      .catch((err) => {});
  }, [newRenderBanner]);

  const handleAddImg = async (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append("type", "5");
    setIsLoading(true);
    axiosClient
      .post(`admin/photos`, formData)
      .then((res) => {
        setNewRenderBanner(res);
      })
      .catch((error) => {
        setNewRenderBanner(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleAddVideo = async (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append("type", "5");
    setIsLoading(true);
    axiosClient
      .post(`admin/videos`, formData)
      .then((res) => {
        setNewRenderBanner(res);
      })
      .catch((error) => {
        setNewRenderBanner(error);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteVideo = async (id: number) => {
    try {
      const response = await axiosClient.delete(`admin/videos/${id}`);
      setNewRenderBanner(response);
    } catch (err) {}
  };
  const handleDeleteImg = async (id: number) => {
    try {
      const response = await axiosClient.delete(`admin/photo/${id}`);
      setNewRenderBanner(response);
    } catch (err) {}
  };

  return (
    <div className="flex flex-col gap-y-[20px]">
      <h1 className="text-[24px]">მთავარ გვერდის ბანერები</h1>
      {isLoading ? (
        <div className="pt-[50px]">
          <Loader1 />
        </div>
      ) : (
        <div
          className={`relative w-full flex max-xl:flex-col-reverse gap-5 rounded-[10px] `}
        >
          <div className="flex flex-col gap-5 w-[calc(100%-420px)] min-w-[450px] max-xl:min-w-0 max-xl:w-full">
            <div className="flex flex-col gap-5 w-full min-w-full self-start rounded-[10px] px-[15px] py-[10px] bg-[#010125]">
              {bannerVideoInfo?.length !== 0 ? (
                bannerVideoInfo?.map((item: any, index: any) => (
                  <div key={item.id} className="flex flex-col gap-5 ">
                    <div className="flex items-center justify-between">
                      <h1 className="text-white text-[20px]">
                        ვიდეო ბანერის ID: {item.id}
                      </h1>
                      <p
                        className="px-[10px] h-10 duration-200 rounded-[12px] bg-[red] text-white cursor-pointer flex justify-center items-center"
                        onClick={() => handleDeleteVideo(item.id)}
                      >
                        ვიდეო ბანერის წაშლა
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-5">
                      <div className="flex flex-col gap-3 max-tiny:w-full">
                        <h1 className="text-white">დესკტოპის ბანერი</h1>
                        <div className="w-[350px] max-tiny:w-full relative h-[180px]">
                          <VideoPlayer item={item} />
                        </div>
                      </div>
                    </div>
                    {index < bannerVideoInfo.length - 1 && (
                      <hr className="h-[1px] bg-white" />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[20px] text-center my-[10px] text-white ">
                  ვიდეო ბანერი ატვირთული არ არის
                </p>
              )}
            </div>
            <div className="flex flex-col gap-5 w-full min-w-full self-start rounded-[10px] px-[15px] py-[10px] bg-[#010125]">
              {bannerImgInfo?.length !== 0 ? (
                bannerImgInfo?.map((item: any, index: any) => (
                  <div key={item.id} className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <h1 className="text-white text-[20px]">
                        ფოტო ბანერის ID: {item.id}
                      </h1>
                      <p
                        className="px-[10px] h-10 duration-200 rounded-[12px] bg-[red] text-white cursor-pointer flex justify-center items-center"
                        onClick={() => handleDeleteImg(item.id)}
                      >
                        ფოტო ბანერის წაშლა
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-[10px]">
                      <h1 className="text-white">
                        ფოტო ბანერის სათაური:{" "}
                        <p className="text-gray-300">{item.title}</p>
                      </h1>
                      <h1 className="text-white">
                        ფოტო ბანერის ტექსტი:{" "}
                        <p className="text-gray-300">{item.description}</p>
                      </h1>
                    </div>
                    <div className="flex flex-wrap gap-5">
                      <div className="flex flex-col gap-3 max-tiny:w-full">
                        <h1 className="text-white">დესკტოპის ფოტო ბანერი</h1>
                        <div className="w-[350px] max-tiny:w-full relative h-[180px] bg-white ">
                          <img
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
                            alt=""
                            className="w-full h-full object-cover "
                          />
                        </div>
                      </div>

                      {item.images_mobile !== null && (
                        <div className="flex flex-col gap-3">
                          <h1 className="text-white">მობილურის ფოტო ბანერი</h1>
                          <div
                            className="w-[200px] relative h-[300px] bg-white "
                            key={item.id}
                          >
                            <img
                              src={`${process.env.NEXT_PUBLIC_API_URL}/${item.images_mobile?.url}`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {index < bannerImgInfo.length - 1 && (
                      <hr className="h-[1px] bg-white" />
                    )}
                  </div>
                ))
              ) : (
                <p className="text-[20px] text-center my-[10px] text-white bg-[#010125] py-[10px] rounded-[10px]">
                  ფოტო ბანერი ატვირთული არ არის
                </p>
              )}
            </div>
          </div>
          <hr className="max-xl:flex hidden w-full h-[3px] bg-[#010125] border-none" />
          <div className="flex flex-col gap-5 self-start sticky top-[20px] w-[400px] max-xl:w-full max-xl:top-0 max-xl:relative">
            <form onSubmit={handleAddVideo} className="flex flex-col gap-5 ">
              <div className="bg-[#010125] rounded-[10px] py-[10px] px-[15px] flex flex-col gap-5">
                <h1 className="text-white text-[20px]">
                  ვიდეო ბანერის დამატება
                </h1>
                <div className="w-full flex flex-col gap-5">
                  <p className="text-left text-white">დესკტოპის ვიდეო ბანერი</p>
                  <AddVideo inputName={"videos"} />
                </div>
                {/* <hr className="w-full h-[1px] bg-white border-none" />
                <div className="w-full text-white">
                  <MyInput
                    name="videoLink"
                    setAllValues={undefined}
                    title="ვიდეო ბანერის YouTube ლინკი"
                  />
                </div> */}
              </div>
              <div className="w-full rounded-[10px] flex justify-end gap-y-[20px]">
                <button
                  type="submit"
                  className="bg-[#0e1420] text-white hover:bg-[#335f7a] duration-200 px-[40px] h-[50px] rounded-[10px] cursor-pointer flex items-center justify-center"
                >
                  ატვირთე ვიდეო
                </button>
              </div>
            </form>
            <form
              onSubmit={handleAddImg}
              className="flex flex-col gap-5 self-start sticky top-[20px] w-[400px] max-xl:w-full max-xl:top-0 max-xl:relative"
            >
              <div className="bg-[#010125] rounded-[10px] py-[10px] px-[15px] flex flex-col gap-5">
                <h1 className="text-white text-[20px]">
                  ფოტო ბანერის დამატება
                </h1>
                <div className="w-full text-white">
                  <MyInput
                    name="title"
                    setAllValues={undefined}
                    title="ბანერის სათაური"
                  />
                </div>
                <div className="w-full text-white">
                  <MyInput
                    name="description"
                    setAllValues={undefined}
                    title="ბანერის ტექსტი"
                  />
                </div>
                <hr className="w-full h-[1px] bg-white border-none" />
                <div className="w-full flex flex-col gap-5">
                  <p className="text-left text-white">დესკტოპის ფოტო ბანერი</p>
                  <AddPhoto inputName={"photos"} />
                </div>
                <hr className="w-full h-[1px] bg-white border-none" />
                <div className="w-full flex flex-col gap-5">
                  <p className="text-left text-white">მობილურის ფოტო ბანერი</p>
                  <AddPhoto inputName={"photos_mobile"} />
                </div>
              </div>
              <div className="w-full rounded-[10px] flex justify-end gap-y-[20px]">
                <button
                  type="submit"
                  className="bg-[#0e1420] text-white hover:bg-[#335f7a] duration-200 px-[40px] h-[50px] rounded-[10px] cursor-pointer flex items-center justify-center"
                >
                  ატვირთე ფოტო
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
