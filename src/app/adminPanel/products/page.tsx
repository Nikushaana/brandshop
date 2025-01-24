import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import AdminProductsContent from "@/app/components/adminpanel/adminProductsContent";

export default function page() {
  return (
    <div className="">
      <AdminProductsContent/>
    </div>
  );
}
