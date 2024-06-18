import React from "react";
import {Avatar} from "@nextui-org/react";

const TransactionListComponent = ({
  sno,
  headline,
  subheadline,
  amount,
  color,
  type,
}) => {
  return (
    <li className="flex justify-between items-center  py-3 px-2">
      <div className={"flex items-center justify-center "}>
         <Avatar showFallback name="User" src={sno}/>
      </div>
      <div className="flex-1 px-4">
        <div className="text-sm capitalize">{headline}</div>
        <div className="text-sm text-gray-400 capitalize">{subheadline}</div>
      </div>
      <div
        className={
          "flex px-2 text-[12px] " +
          (type == "DEPOSIT" ? "text-green-400" : "text-red-400")
        }
      >
        {" "}
        {type == "DEPOSIT" ? "+" : "-"}₹{Math.abs(amount)}
      </div>
    </li>
  );
};

export default TransactionListComponent;
