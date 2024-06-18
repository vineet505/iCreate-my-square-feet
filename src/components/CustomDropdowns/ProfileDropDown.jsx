
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProfileDropDown() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(session?.user);

  useEffect(() => {
    if (status === "authenticated") {
      setUser(session?.user);
    }
  }, [status, session]);
  return (
    <Dropdown placement="bottom-end" backdrop="blur">
      <DropdownTrigger>
        <Avatar
          size="md"
          as="button"
          aria-label="Profile Picture"
          className="transition-transform"
          src={
            user?.user_details?.profile_picture_url_key ||
            "https://i.pravatar.cc/500?img=32"
          }
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions">
        <DropdownItem key="email" className="h-14 gap-2" textValue="email">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user?.user_details?.email_id || ""}</p>
        </DropdownItem>
        <DropdownItem key="profile" textValue="profile" href="/profile">
          <p>Profile</p>
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          textValue="logout"
          onClick={() => signOut()}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
