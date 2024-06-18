"use client";
import React from "react";
import PageHeader from "@/components/Headers/PageHeader";
import { GetUsersDetailsByIdUrl } from "@/static/ApiEndpoints";
import { useState, useEffect } from "react";
import { GetUsersDetailsById } from "@/lib/Users/UserHandler";
import { useSession } from "next-auth/react";
import { SERVER_SUCCESS } from "@/static/Static";
import UsersTab from "@/components/Users/UsersTab";
import UserInfo from "@/components/Users/UserInfo";

export default function Page({ params }) {
  const { data: session, status } = useSession();

  const [user, setUser] = useState({ legal_name: "User" });

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      const url =
        GetUsersDetailsByIdUrl + "?user_id=" + params.userid;
      const response = await GetUsersDetailsById(url, session.jwt);
      if (response.type == SERVER_SUCCESS) {
        const data = response.data;
        setUser(data.user_details);
      }
    }, 10);
  }, [status, params?.userid, session?.jwt]);

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <PageHeader title={"Profile: " + user.legal_name} />
        </div>
      </div>
      <UserInfo user={user} />
      <div className="bg-[#fefeff] dark:bg-[#15171c] w-full rounded-md px-6 overflow-auto py-6 mt-8 ">
        <UsersTab userid={params.userid} />
      </div>
    </>
  );
}
