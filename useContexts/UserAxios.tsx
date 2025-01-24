"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axiosClient from "./AxiosClient/AxiosClient";
import { AxiosForSharingStatesAxiosContext } from "./sharedStates";

export const UserContext = createContext<any>(null);

const UserAxiosContext = ({ children }: any) => {
  const { setIsAuthorizedAdmin } = useContext(
    AxiosForSharingStatesAxiosContext
  );
  const [admin, setAdmin] = useState<any>({});
  const [isLoaderAdmin, setIsLoaderAdmin] = useState<boolean>(true);
  const [newRenderAdmin, setNewRenderAdmin] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenadmin = localStorage.getItem("BrandShopAdmin");

      _setTokenAdmin(tokenadmin);
    }
  }, []);

  const [tokenadmin, _setTokenAdmin] = useState<string | null>(null);

  const setTokenAdmin = (tokenadmin: string | null) => {
    _setTokenAdmin(tokenadmin);
    if (tokenadmin) {
      localStorage.setItem("BrandShopAdmin", tokenadmin);
    } else {
      localStorage.removeItem("BrandShopAdmin");
    }
  };

  useEffect(() => {
    if (admin?.email || admin?.password) {
      setIsAuthorizedAdmin(true);
    } else {
      setIsAuthorizedAdmin(false);
    }
  }, [admin]);

  // get current logged in admin
  useEffect(() => {
    if (tokenadmin) {
      setIsLoaderAdmin(true);
      axiosClient
        .get("/admin")
        .then((res) => {
          setAdmin(res.data);
          setIsLoaderAdmin(false);
        })
        .catch((err) => {});
    }
  }, [tokenadmin, newRenderAdmin]);

  return (
    <UserContext.Provider
      value={{
        admin,
        setAdmin,
        setTokenAdmin,
        setIsAuthorizedAdmin,

        isLoaderAdmin,
        setIsLoaderAdmin,
        newRenderAdmin,
        setNewRenderAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserAxiosContext;
