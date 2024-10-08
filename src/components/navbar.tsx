"use client";

import { Logo, SearchIcon } from "@/src/components/icons";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  NavbarBrand,
  NavbarContent,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { Select, SelectItem } from "@nextui-org/select";
import { SharedSelection } from "@nextui-org/system";
import { default as Link, default as NextLink } from "next/link";
import { useEffect, useState } from "react";
import { useUser } from "../context/user.provider";
import useDebounce from "../hooks/useDebounce.hook";
import CreateContentModal from "./modals/CreateContentModal";
import NavbarDropdown from "./UI/NavbarDropdown";

type CategoryKey = "STORY" | "TIP";

export const Navbar = () => {
  const { user, setParams } = useUser();
  const [searchValue, setSearchValue] = useState("");
  const [filters, setFilters] = useState<CategoryKey[]>([]);

  console.log(filters);

  const searchTerm = useDebounce(searchValue);

  useEffect(() => {
    const params: { name: string; value: string }[] = [];

    if (searchTerm) {
      params.push({ name: "searchTerm", value: searchTerm });
    }

    if (filters.length > 0) {
      params.push({ name: "category", value: filters.join(",") });
    }

    console.log("Setting Params:", params);

    setParams(params);
  }, [searchTerm, filters, setParams]);

  const categories = [
    { key: "STORY", label: "Story" },
    { key: "TIP", label: "Tip" },
  ];

  const handleFilterChange = (selectedKeys: SharedSelection) => {
    const selectedArray = Array.from(selectedKeys);
    setFilters(selectedArray as CategoryKey[]);
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="bg-[#101214] mb-4">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
        {/* search by content */}
        <div className="min-w-[400px] mx-auto">
          <Input
            onChange={(e) => setSearchValue(e.target.value)}
            isClearable
            radius="lg"
            classNames={{
              label: "text-black/50 dark:text-white/90",
              input: [
                "bg-transparent",
                "text-black/90 dark:text-white/90",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60",
              ],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "dark:bg-default/60",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/70",
                "dark:hover:bg-default/70",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-default/60",
                "!cursor-text",
              ],
            }}
            placeholder="Type to search..."
            startContent={
              <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
          />
        </div>

        {/* filter category */}
        <div className="w-[200px]">
          <Select
            label="Select Categories"
            placeholder="Select categories"
            onSelectionChange={handleFilterChange}
          >
            {categories.map((category) => (
              <SelectItem key={category.key} value={category.key}>
                {category.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </NavbarContent>
      <NavbarBrand as="li" className=" max-w-fit">
        {user?.email ? (
          <div className="flex gap-4 ">
            <div className="border rounded-lg">
              <CreateContentModal />
            </div>

            <NextLink className="flex justify-start items-center" href="/">
              <NavbarDropdown />
            </NextLink>
          </div>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </NavbarBrand>
    </NextUINavbar>
  );
};
