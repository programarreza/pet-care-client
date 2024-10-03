"use client";

import { Button } from "@nextui-org/button";
import { NavbarContent, Navbar as NextUINavbar } from "@nextui-org/navbar";
import Link from "next/link";
import CreateContentModal from "../../modals/CreateContentModal";

const DashboardSidebar = () => {
  return (
    <div className="w-1/4 h-[calc(100vh-70px)] border border-gray-200 sticky top-[70px] overflow-y-auto">
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="flex flex-col gap-2 justify-start ml-2 mt-10 w-full">
          <Link href={"/profile"} className="w-full">
            <Button className="w-full ">Profile</Button>
          </Link>
          <div className="w-full bg-[#39393F] text-center rounded-xl">
            <CreateContentModal />
          </div>
          <Link href={"/users"} className="w-full">
            <Button className="w-full ">Users</Button>
          </Link>
          <Link href={"/payment-history"} className="w-full">
            <Button className="w-full ">Payment History</Button>
          </Link>
        </NavbarContent>
      </NextUINavbar>
    </div>
  );
};

export default DashboardSidebar;
