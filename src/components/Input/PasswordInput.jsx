import React from "react";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";

const PasswordInput = ({
  formik_props,
  toggleVisibility,
  isVisible,
  formik_change,
  placeholder="Password",
}) => {
  return (
    <div className="w-full h-[30px] border-1 flex items-center bg-white rounded-md">
      <div className="h-full border-r-2 px-2">
        <button className="h-full" type="button" onClick={toggleVisibility}>
          {isVisible ? (
            <EyeSlashFilledIcon className="text-2xl text-default-400 h-full" />
          ) : (
            <EyeFilledIcon className="text-2xl text-default-400 h-full" />
          )}
        </button>
      </div>
      <input
        className="w-full h-full text-sm text-black rounded-md mx-2 focus:outline-none  bg-white "
        onChange={formik_change}
        name="password"
        placeholder={placeholder}
        type={isVisible ? "text" : "password"}
        {...formik_props}
      />
    </div>
  );
};

export default PasswordInput;
