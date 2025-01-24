"use client";

import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AxiosForSharingStatesAxiosContext } from "../../../../useContexts/sharedStates";

export default function VideoPlayer({ item }: any) {
  const { muteVideo, setMuteVideo } = useContext(
    AxiosForSharingStatesAxiosContext
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  // const [isMuted, setIsMuted] = useState<boolean>(true);

  const handleMouseOver = () => {
    // setIsHovered(true);
    // setIsMuted(false);
    videoRef.current?.play();
  };

  const handleMouseOut = () => {
    // setIsHovered(false);
    // setIsMuted(true);
  };

  const handleVideoEnded = () => {
    // Restart the video when it ends
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div className="relative h-full w-full">
      {item?.url ? (
        <video
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          autoPlay={true}
          onEnded={handleVideoEnded}
          muted={muteVideo}
          controls={isHovered}
          className={`w-full flex items-center h-full object-cover justify-center`}
          ref={videoRef}
          width="100%"
          height="100%"

          // volume={0.5}
        >
          <source
            src={`${process.env.NEXT_PUBLIC_API_URL}/${item.url}`}
            type="video/mp4"
          />
        </video>
      ) : (
        <iframe
          className="w-full flex items-center h-full object-cover justify-center"
          src={`${item.videoLink}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      )}
    </div>
  );
}
