import React from "react";
import { MailIcon } from "@/icons/MailIcon";
const EmailInput = ({ formik_props }) => {
  return (
    <div className="w-full h-[30px] border-1 flex items-center bg-white rounded-md">
      <div className="h-full border-r-2  px-2">
        <MailIcon className="text-2xl text-default-400 h-full " />
      </div>
      <input
        className="w-full h-full font-extralight text-sm  p-2 focus:outline-none  text-black  bg-white "
        type="text"
        name="text"
        placeholder="Email"
        {...formik_props}
      />
    </div>
  );
};

export default EmailInput;
