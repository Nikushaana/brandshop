import InformationEditContent from '@/app/components/adminpanel/InformationEditContent'
import React from 'react'

export default function page() {
  return (
    <div className="flex flex-col gap-y-[10px]">
      <h1 className="text-[24px]  max-lg:ml-[60px] max-sm:text-[20px]">ადმინის პროფილის რედაქტირება</h1>
      <InformationEditContent />
    </div>
  )
}
