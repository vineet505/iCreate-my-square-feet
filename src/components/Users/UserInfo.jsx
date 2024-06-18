import React from 'react'
import Image from "next/image";
import {timeStamptoLocalDate} from "@/lib/Users/formatter"

const UserInfo = ({user}) => {
  return (
    <div className=" bg-[#fefeff] dark:bg-[#15171c] w-full rounded-md px-6 py-6">
    <div className="md:flex items-center ">
      <Image
        height={200}
        width={200}
        className="rounded-lg mr-6 "
        src={
          user?.profile_picture_uploaded
            ? user.profile_picture_url_key
            : "https://i.pravatar.cc/150"
        }
        alt="User profile picture"
        onError={(e) => {
          e.target.id = "https://i.pravatar.cc/300";
          e.target.srcset = "https://i.pravatar.cc/300";
        }}
      />
    <div className="flex flex-wrap">
      <div className="md:w-[22%] flex-auto w-full text-[14px] mx-2 py-2  overflow-auto">
        <div className="font-bold ">Legal Name:</div> {user.legal_name}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">Email:</div> {user.email_id}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">Mobile:</div> {user.mobile_number}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">User Type:</div> {user.user_type}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">Username:</div> {user.username}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">Status:</div>{" "}
        {user.is_active ? "Active" : "Inactive"}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">Kyc Status:</div>{" "}
        {user.kyc_verified ? "Verified" : "Not Verified"}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">Created at:</div>{" "}
        {timeStamptoLocalDate(user.created_at)}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">Updated at:</div>{" "}
        {timeStamptoLocalDate(user.updated_at)}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">Last Login:</div>{" "}
        {timeStamptoLocalDate(user.last_login_at)}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">Secure Pin:</div>{" "}
        {user.secure_pin_set ? "Set" : "Not Set"}
      </div>
      <div className="md:w-[22%] flex-auto w-full text-[14px]  mx-2 py-2  overflow-auto">
        <div className="font-bold ">Record Id:</div> {user.id}
      </div>
    </div>
    </div>

  </div>
  )
}

export default UserInfo