"use client";
import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import LoginArrowIcon from "@/icons/LoginArrowIcon";
const LoginButton = ({ submitLoading, text="Log In" }) => {
  return (
    <button className="w-full relative flex items-center justify-center px-6 py-1 mt-4 overflow-hidden font-medium  transition duration-300 ease-out border-2 dark:border-none  rounded-[7px] shadow-md group bg-[#15171c] dark:bg-gray-700">
      {submitLoading ? <span></span> : (
        <>
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#15171c] dark:bg-gray-700 group-hover:translate-x-0 ease">
            <LoginArrowIcon />
          </span>

          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            {text}
          </span>
          <span className="relative invisible">{text}</span>
        </>
      )}

      <div className={submitLoading ? "block" : "hidden"}>
        <Spin
          indicator={<LoadingOutlined className={"text-white mb-1"} />}
          size="sm"
        />
      </div>
    </button>
  );
};

export default LoginButton;

// <button
// type="submit"
// className="w-full bg-[#664dc9] opacity-100 text-white rounded-[7px] text-[12px] px-[12px] py-[8px] mt-4  relative inline-flex items-center justify-center  overflow-hidden font-medium transition duration-300 ease-out border-2  shadow-md group"
// >
//   <LoginArrowIcon />

// <div className="flex justify-center items-center">
//   <span className="absolute flex items-center justify-center w-full h-full  transition-all duration-1000 transform group-hover:translate-x-full ease">
//     Login
//   </span>
//   <span className="relative invisible">Login</span>
//   <div className={submitLoading ? "block" : "hidden"}>
//     <Spin
//       indicator={<LoadingOutlined className={"text-white "} />}
//       size="sm"
//     />
//   </div>
// </div>
// </button>
