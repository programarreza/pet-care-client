"use client";

import { Button } from "@nextui-org/button";
import { NavbarContent, Navbar as NextUINavbar } from "@nextui-org/navbar";
import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <div className=" h-[calc(100vh-70px)] rounded-md bg-[#18191A] sticky overflow-y-auto ">
      <NextUINavbar maxWidth="xl" position="sticky" className="px-0">
        <NavbarContent className="flex flex-col  justify-start bg-[#18191A]  px-0 mx-0 ">
          <Link href={"/profile"} className="w-full">
            <Button className="w-full ">Profile</Button>
          </Link>
          <Link href={"/all-contents"} className="w-full">
            <Button className="w-full ">All Contents</Button>
          </Link>
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
