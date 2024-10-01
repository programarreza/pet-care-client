import { siteConfig } from "@/src/config/site";
import {
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import NextLink from "next/link";

const Sidebar = () => {
  return (
    <div className="w-1/4 h-[calc(100vh-70px)] border border-gray-200 sticky top-[70px] overflow-y-auto">
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="flex flex-col gap-2 justify-start ml-2 mt-10 w-full">
          <ul>
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
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
