import React from "react";

const FooterComponent = () => {
  return (
    <footer className=" text-white py-4 px-2 mt-20 sticky top-[100vh]">
      <div className=" flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 text-center md:text-start  md:mb-0 ">
          <p className="text-xs text-gray-400 md:text-sm">
            Copyright 2024 &copy; All Rights Reserved
          </p>
        </div>
        <div className="w-full md:w-1/2 md:mb-0  ">
          <ul className="list-reset flex justify-between mt-4 md:mt-0 md:justify-end flex-wrap text-xs md:text-sm gap-3">
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Contact
              </a>
            </li>
            <li className="mx-4">
              <a href="#" className="text-gray-400 hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white">
                Terms of Use
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
