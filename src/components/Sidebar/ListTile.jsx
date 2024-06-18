import React from "react";
import Link from "next/link";

const ListTile = ({ active, url, name, toggle, icon }) => {
  return (
    <li className="px-2">
      <Link
        href={url}
        className={`flex items-center text-[16px]    ${
          toggle ? "justify-center" : "hover:-100"
        }`}
      >
        <span
          className={
            active
              ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg p-2"
              : "bg-transparent dark:bg-transparent  p-2 hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg"
          }
        >
          {icon}
        </span>
        {!toggle && <span
         className={"ml-3 " + (active ? "text-white" : "text-gray-400")}
         
         >{name}</span>}
      </Link>
    </li>
  );
};

export default ListTile;
