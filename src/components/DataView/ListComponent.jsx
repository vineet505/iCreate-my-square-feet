import React from "react";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { EditIcon } from "@/icons/EditIcon";
import { Avatar } from "@nextui-org/react";

const ListComponent = ({ sno, headline, subheadline, time }) => {
  return (
    <li className="flex justify-between items-center  p-3">
      <div
        className={
          "flex items-center justify-center text-white"
        }
      >
       <Avatar showFallback size="md" name="User" src={sno}/>

      </div>
      <div className="flex-1 px-4">
        <div className="text-sm text-ellipsis">{headline.slice(0,20)}</div>
        <div className="text-sm text-gray-400">{subheadline}</div>
      </div>  
      <div className="flex px-2 text-sm text-gray-400">{time}</div>
    </li>
  );
};

export const CandleListComp = ({ time, price, id, handleGraphDelete, onOpenEdit, setSelected }) => {
  return (
    <li className="flex justify-between items-center  p-3">
      <div
        className={
          "flex items-center justify-center  dark:text-white rounded-full h-[36px] w-[36px] "
        }
      >
        {parseInt(id)+1}
      </div>
      <div className="flex px-4">
        <div className="text-sm">₹{price}</div>
      </div>
      <div className="flex px-2 text-sm text-gray-400">{time}</div>
      <div className="flex gap-2">
        <span onClick={()=>{
          setSelected(id);
          onOpenEdit();
        }} className="cursor-pointer">
          <EditIcon />
        </span>
        <span onClick={()=>handleGraphDelete(id)} className="cursor-pointer text-red-800" >
          <DeleteIcon />
        </span>
      </div>
    </li>
  );
};

export default ListComponent;
