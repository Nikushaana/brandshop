"use client";

import { createContext, useRef, useState } from "react";

export const AxiosForSharingStatesAxiosContext = createContext<any>(null);

const SharingStatesContext = ({ children }: any) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [openAuthorization, setOpenAuthorization] = useState<boolean>(false);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [Alertstatus, setAlertstatus] = useState<boolean>(false);
  const [alertText, setAlertText] = useState<string>("");

  const [statusPopUp, setStatusPopUp] = useState<boolean>(false);
  const [statusPopUpData, setStatusPopUpData] = useState<number>();
  const [renderEachOrder, setrenderEachOrder] = useState<boolean>(true);

  const [addedProd, setAddedProd] = useState<boolean>(false);
  const [muteVideo, setMuteVideo] = useState<boolean>(true);

  const [openAdminMenuPopUp, setOpenAdminMenuPopUp] = useState<boolean>(false);

  const [newRenderBanner, setNewRenderBanner] = useState<any>();

  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const scrollToSection = (ref: any) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [newRenderProductsImgsandColor, setNewRenderProductsImgsandColor] =
    useState<any>();
  const [loaderEachCardData, setLoaderEachCardData] = useState<boolean>(false);

  const [sexFilter, setSexFilter] = useState("")

  const [gender, setGender] = useState([
    {
      id: 0,
      name: "ბავშვი",
      img: "/images/children.jpg",
    },
    {
      id: 1,
      name: "კაცი",
      img: "/images/man.avif",
    },
    {
      id: 2,
      name: "ქალი",
      img: "/images/woman.avif",
    },
  ]);

  return (
    <AxiosForSharingStatesAxiosContext.Provider
      value={{
        openMenu,
        setOpenMenu,
        openCart,
        setOpenCart,
        section1Ref,
        section2Ref,
        section3Ref,
        scrollToSection,
        openAuthorization,
        setOpenAuthorization,
        isAuthorizedAdmin,
        setIsAuthorizedAdmin,
        openSearch,
        setOpenSearch,
        openAdminMenuPopUp,
        setOpenAdminMenuPopUp,
        showAlert,
        setShowAlert,
        alertText,
        setAlertText,
        Alertstatus,
setAlertstatus,
        addedProd,
        setAddedProd,
        newRenderBanner,
        setNewRenderBanner,
        statusPopUp,
        setStatusPopUp,
        statusPopUpData,
        setStatusPopUpData,
        renderEachOrder,
        setrenderEachOrder,
        muteVideo,
        setMuteVideo,
        newRenderProductsImgsandColor,
        setNewRenderProductsImgsandColor,
        loaderEachCardData,
        setLoaderEachCardData,
        gender,
        sexFilter,
setSexFilter,
      }}
    >
      {children}
    </AxiosForSharingStatesAxiosContext.Provider>
  );
};

export default SharingStatesContext;
