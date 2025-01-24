import AddProductImgs from '@/app/components/adminpanel/addproductimgs'
import React from 'react'

export default function page({
  params,
}: {
  params: { productId: string };
}) {
  return (
    <div>
      <AddProductImgs paramsId={params.productId}/>
    </div>
  )
}
