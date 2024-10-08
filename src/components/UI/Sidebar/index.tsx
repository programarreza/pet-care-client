import {
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import NextLink from "next/link";

import { siteConfig } from "@/src/config/site";

const Sidebar = () => {
  return (
    <div className="h-[calc(100vh-70px)] sticky top-[70px] overflow-y-auto ">
      <NextUINavbar className="" maxWidth="xl" position="sticky">
        <NavbarContent className="flex flex-col gap-2 justify-start ml-2 mt-10 ">
          <ul>
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href} className="bg-none">
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  href={item.href}
                >
                  <span className="block w-full px-4 py-2 hover:bg-gray-900 rounded-md">
                    {item.label}
                  </span>
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>
      </NextUINavbar>
    </div>
  );
};

export default Sidebar;
