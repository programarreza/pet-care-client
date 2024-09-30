import Container from "@/src/components/Container";
import { Navbar } from "@/src/components/navbar";
import { siteConfig } from "@/src/config/site";
import {
  NavbarContent,
  NavbarItem,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import NextLink from "next/link";

import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Container>
        <Navbar />
        <div className="flex gap-5">
          <div className="border w-1/4 h-[calc(100vh-70px)]">
            <NextUINavbar maxWidth="xl" position="sticky">
              <NavbarContent
                className="basis-1/5 sm:basis-full"
                justify="start"
              >
                <ul className="flex flex-col gap-2 justify-start ml-2 mt-52 w-full">
                  {siteConfig.navItems.map((item) => (
                    <NavbarItem key={item.href}>
                      <NextLink
                        className={clsx(
                          linkStyles({ color: "foreground" }),
                          "data-[active=true]:text-primary data-[active=true]:font-medium"
                        )}
                        color="foreground"
                        href={item.href}
                      >
                        <span className=" w-full px-4 py-2 hover:bg-gray-900 rounded-md">
                          {item.label}
                        </span>
                      </NextLink>
                    </NavbarItem>
                  ))}
                </ul>
              </NavbarContent>
            </NextUINavbar>
          </div>
          <div className="w-2/4 border"> {children}</div>
        </div>
      </Container>
    </div>
  );
};

export default CommonLayout;
