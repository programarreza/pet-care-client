"use client";

import { Button } from "@nextui-org/button";
import { NavbarContent, Navbar as NextUINavbar } from "@nextui-org/navbar";
import Link from "next/link";

import { useUser } from "@/src/context/user.provider";

const DashboardSidebar = () => {
  const { user } = useUser();

  return (
    <div className=" h-[calc(100vh-70px)] rounded-md bg-[#18191A] sticky overflow-y-auto ">
      <NextUINavbar className="px-0" maxWidth="xl" position="sticky">
        <NavbarContent className="flex flex-col  justify-start bg-[#18191A]  px-0 mx-0 ">
          <Link className="w-full" href={"/profile"}>
            <Button className="w-full ">Profile</Button>
          </Link>
          {user?.role === "ADMIN" && (
            <>
              <Link className="w-full" href={"/all-contents"}>
                <Button className="w-full ">All Contents</Button>
              </Link>
              <Link className="w-full" href={"/users"}>
                <Button className="w-full ">Users</Button>
              </Link>
              <Link className="w-full" href={"/payment-history"}>
                <Button className="w-full ">Payment History</Button>
              </Link>
            </>
          )}
        </NavbarContent>
      </NextUINavbar>
    </div>
  );
};

export default DashboardSidebar;
