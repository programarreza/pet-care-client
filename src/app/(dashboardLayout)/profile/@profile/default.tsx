"use client";

import { Avatar } from "@nextui-org/avatar";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useGetUserProfile } from "@/src/hooks/user.hook";
import { useUser } from "@/src/context/user.provider";
import UpdateProfile from "@/src/components/UI/User/UpdateProfile";

const ProfileDefault = () => {
  const router = useRouter();
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState("contents");
  const { data: userInfo } = useGetUserProfile(user?.email as string);

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div>
      <div className="relative">
        <div className="border rounded-md h-32 bg-gray-900" />
        <div className="absolute -mt-24 ml-5">
          <Avatar
            isBordered
            className="w-50 h-50 "
            color="primary"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        </div>
      </div>

      <div className="w-full mt-20 flex justify-between">
        <div className="  max-w-60 pl-5">
          <h2>{userInfo?.name}</h2>
          <h2>{userInfo?.email}</h2>
        </div>
        <div className="flex gap-2 hover:bg-gray-900 items-center p-2 rounded-md cursor-pointer shadow-2xl mr-2">
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <UpdateProfile user={userInfo} />
        </div>
      </div>

      {/* navLink */}
      <Breadcrumbs
        className="p-3 my-5 border-b"
        classNames={{
          list: "gap-2",
        }}
        itemClasses={{
          item: [
            "p-3 border-small border-default-400 rounded-small",
            "data-[current=true]:border-foreground data-[current=true]:bg-foreground data-[current=true]:text-background transition-colors",
            "data-[disabled=true]:border-default-400 data-[disabled=true]:bg-default-100",
          ],
          separator: "hidden",
        }}
        size="sm"
        onAction={(key) => setCurrentPage(key as string)}
      >
        <BreadcrumbItem
          key="contents"
          isCurrent={currentPage === "contents"}
          onClick={() => handleNavigation("/profile")}
        >
          Contents
        </BreadcrumbItem>
        <BreadcrumbItem
          key="followed"
          isCurrent={currentPage === "followed"}
          onClick={() => handleNavigation("/profile/followed")}
        >
          Followed
        </BreadcrumbItem>
        <BreadcrumbItem
          key="followers"
          isCurrent={currentPage === "followers"}
          onClick={() => handleNavigation("/profile/followers")}
        >
          Followers
        </BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
};

export default ProfileDefault;
