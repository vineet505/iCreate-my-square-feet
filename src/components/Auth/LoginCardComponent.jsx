import React from "react";
import Image from "next/image";
const LoginCardComponent = () => {
  return (
    <div className="md:w-[50%] h-full bg-[#15171c] dark:bg-gray-700 rounded-l-md">
      <div className="h-full w-full p-5">
        <div className="mb-5">
          <Image
            src={
              "https://spruko.com/demo/django/azea/azea/assets/images/brand/logo1.png"
            }
            width={132}
            height={48}
            alt="App Image"
          />
        </div>
        <div className="p-4">
          <div className="text-[18px] mb-6 font-bold text-white">
            Welcome Back To Azea !
          </div>
          <div className="mb-7 text-white"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem et esse in velit deleniti facilis quo! </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCardComponent;
