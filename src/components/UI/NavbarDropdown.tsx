"use client";

import { useUser } from "@/src/context/user.provider";
import { logout } from "@/src/services/AuthService";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { usePathname, useRouter } from "next/navigation";

const NavbarDropdown = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setIsLoading: userLoading } = useUser();

  const handleLogout = () => {
    logout();
    userLoading(true);
  };

  const handleNavigation = (pathname: string) => {
    router.push(pathname);
  };

  return (
    <div>
      <Dropdown>
        <DropdownTrigger onClick={(e) => e.preventDefault()}>
          <Avatar className="cursor-pointer" src={user?.image} />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={() => handleNavigation("/profile")}>
            <div className="flex gap-2">
              <Avatar src={user?.image} />
              <div>
                <p>View Profile</p>
                <p>{user?.email}</p>
              </div>
            </div>
          </DropdownItem>

          <DropdownItem
            onClick={() => handleLogout()}
            className="text-danger"
            color="danger"
          >
            Log out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default NavbarDropdown;
