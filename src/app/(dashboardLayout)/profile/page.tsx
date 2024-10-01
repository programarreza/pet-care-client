"use client";

import { useUser } from "@/src/context/user.provider";
import { Avatar } from "@nextui-org/avatar";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { useState } from "react";

const Profile = () => {
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState("posts");

  return (
    <div>
      <div className="relative">
        <div className="border rounded-md h-44 bg-gray-900"></div>
        <div className="absolute -mt-24 ml-5">
          <Avatar
            isBordered
            color="primary"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
            className="w-50 h-50 "
          />
        </div>
      </div>

      <div className="mt-20 border max-w-60 pl-5">
        <h2>{user?.name}</h2>
        <h2>{user?.email}</h2>
      </div>

      {/* navLink */}
      <Breadcrumbs
        className="p-3 my-5 border-b"
        size="sm"
        onAction={(key) => setCurrentPage(key)}
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
        <BreadcrumbItem key="posts" isCurrent={currentPage === "posts"}>
          Posts
        </BreadcrumbItem>
        <BreadcrumbItem key="followed" isCurrent={currentPage === "followed"}>
          Followed
        </BreadcrumbItem>
        <BreadcrumbItem key="followers" isCurrent={currentPage === "followers"}>
          Followers
        </BreadcrumbItem>
      </Breadcrumbs>
    </div>
  );
};

export default Profile;
