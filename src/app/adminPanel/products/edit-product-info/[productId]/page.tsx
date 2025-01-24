import EditProductInfo from '@/app/components/adminpanel/editProductInfo';
import React from 'react'

export default function page({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <div>
      <EditProductInfo paramsId={params.productId}/>
    </div>
  )
}