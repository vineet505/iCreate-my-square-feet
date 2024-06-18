import React from 'react'
import {Skeleton} from "@nextui-org/react";

const TopProductsLoading = () => {
  return <>
  {
      [1,2,3,4,5,6].map((item, index) => {
          return (
              <div key={index} className="my-3 px-10 w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12"/>
              </div>  
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3  rounded-lg"/>
                <Skeleton className="h-3  rounded-lg"/>
              </div>
            </div>
          )
      })
  }

</>
}

export default TopProductsLoading