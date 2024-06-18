import React from "react";

const TableHeading = () => {
  return (
    <div className="h-[50px] border-b-1 border-b-gray-200 dark:border-b-gray-900">
      <div className="flex h-full justify-around text-[14px] dark:bg-[#15171c] text-gray-400 dark:text-white text-center items-center px-2">
        <span className="w-[10%] ">S.No</span>
        <span className="w-[15%] ">Product Category</span>
        <span className="w-[25%]">Product Name</span>
        <span className="w-[10%]">Sale Value</span>
        <span className="w-[15%]">Sale Info</span>
      </div>
    </div>
  );
};

export default TableHeading;
