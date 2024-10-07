"use client";

import UpdateProfile from "@/src/components/UI/User/UpdateProfile";
import { useUser } from "@/src/context/user.provider";
import { useGetUserProfile } from "@/src/hooks/user.hook";
import { Avatar } from "@nextui-org/avatar";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const router = useRouter();
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState("contents");
  const { data: userInfo } = useGetUserProfile(user?.email as string);

  console.log(userInfo)

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div className="bg-[#101214] mb-2">
      <div className="relative ">
        <div className="border rounded-md h-32 bg-gray-900"></div>
        <div className="absolute -mt-24 ml-5">
          <Avatar
            isBordered
            color="primary"
            src={userInfo?.image}
            className="w-36 h-36 "
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
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <UpdateProfile user={userInfo} />
        </div>
      </div>

      {/* navLink */}
      <Breadcrumbs
        className="p-3 my-5 border-b py-6"
        size="sm"
        onAction={(key) => setCurrentPage(key as string)}
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
      >
        <BreadcrumbItem
          onClick={() => handleNavigation("/profile")}
          key="contents"
          isCurrent={currentPage === "contents"}
        >
          Contents
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => handleNavigation("/profile/followed")}
          key="followed"
          isCurrent={currentPage === "followed"}
        >
          Followed
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => handleNavigation("/profile/followers")}
          key="followers"
          isCurrent={currentPage === "followers"}
        >
          Followers
        </BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
};

export default Profile;
