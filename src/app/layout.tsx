import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import { useContext, useState } from "react";
import CartPopUp from "./components/cartPopUp/CartPopUp";
import SharingStatesContext, {
  AxiosForSharingStatesAxiosContext,
} from "../../useContexts/sharedStates";
import Scrolltotop from "./components/scrolltotop";
import ProductsContext from "../../useContexts/ProductsAxios";
import CartContext from "../../useContexts/CartAxios";
import UserAxiosContext from "../../useContexts/UserAxios";
import AuthorizationPopUp from "./components/AuthorizationPopUp/AuthorizationPopUp";
import SearchPopUp from "./components/header/SearchPopUp";
import MenuPopUp from "./components/MenuPopUp/MenuPopUp";
import Alert from "./components/alert/alert";
import OrderStatusPopUp from "./components/orderStatusPopUp/OrderStatusPopUp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clothes From Europe",
  description: "დიდი არჩევანი, მისაღები ფასები",
  // openGraph: {
  //   title: "Clothes From Europe - დიდი არჩევანი, მისაღები ფასები",
  //   description: "Clothes From Europe - დიდი არჩევანი, მისაღები ფასები",
  //   images: [
  //     {
  //       url: "/images/bershka.svg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Clothes From Europe",
  //     },
  //   ],
  //   type: "website",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SharingStatesContext>
          <ProductsContext>
            <CartContext>
              <UserAxiosContext>
                <div className={`bg-[#f9f9f9]`}>
                  <Header />
                  {children}
                  <Footer />
                  <CartPopUp />
                  <Scrolltotop />
                  <AuthorizationPopUp />
                  <SearchPopUp />
                  <MenuPopUp />
                  <Alert />
                  <OrderStatusPopUp />
                </div>
              </UserAxiosContext>
            </CartContext>
          </ProductsContext>
        </SharingStatesContext>
      </body>
    </html>
  );
}
