"use client";
import React from "react";
import HamburgerIcon from "@/icons/HamburgerIcon";
import { ThemeToggle } from "../ThemeSwitcher/ThemeToggle";
import { useSession } from "next-auth/react";
import { useEntityStorage } from "@/store/GlobalStore";
import dynamic from "next/dynamic";
import { NotificationIcon } from "@/icons/NotificationIcon";
import { Badge } from "@nextui-org/react";
const ProfileDropDown = dynamic(
  () => import("@/components/CustomDropdowns/ProfileDropDown"),
  { ssr: false }
);

const TopHeader = () => {
  const { data: session, status } = useSession();
  const toggle = useEntityStorage((state) => state.toggle);
  const toggleHandler = () => {
    useEntityStorage.setState((state) => ({
      toggle: !state.toggle,
    }));
  };

  return (
    <div
      className={
        " h-[70px] fixed top-0 z-40 flex items-center justify-between px-8 bg-[#fbfbfb]  dark:bg-[#0D0E13] border-b-1 dark:border-gray-800 " +
        (toggle ? " w-[calc(100vw-120px)] " : " w-[calc(100vw-300px)] ")
      }
    >
      <div onClick={toggleHandler}>
        <HamburgerIcon />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <div className="flex items-center mr-3 ">
          <Badge color="danger" content={5} shape="circle">
            <NotificationIcon className="fill-current" size={30} />
          </Badge>
        </div>
        <ProfileDropDown
          email={session?.user?.user_details?.email_id}
          profile_url={session?.user?.user_details?.profile_picture_url_key}
        />
      </div>
    </div>
  );
};

export default TopHeader;
