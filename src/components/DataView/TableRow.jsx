import React from "react";
import {Avatar} from "@nextui-org/react";

const TableRow = ({
  projectLogo,
  productCategory,
  productName,
  saleValue,
  saleInfo,
  status,
}) => {
  return (
    <li className="h-[60px] border-b-1 border-b-gray-200 dark:border-b-gray-900 hover:bg-gray-100 dark:hover:bg-blue-950">
      <div className="flex h-full justify-evenly text-[14px] text-gray-400 dark:text-white text-center items-center">
        <span className="w-[10%] flex justify-center ">
          <Avatar showFallback size="md" name="Logo" src={projectLogo}/>
        </span>
        <span className="w-[15%] capitalize"> {productCategory} </span>
        <span className="w-[25%] capitalize"> {productName.slice(0,20)} </span>
        <span className="w-[10%]"> {saleValue} </span>
        <span className="w-[18%]"> {saleInfo} </span>
      </div>
    </li>
  );
};

export default TableRow;
