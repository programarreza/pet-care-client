"use client";

import { useUser } from "@/src/context/user.provider";
import {
  useBlockStatusChange,
  useRoleStatusChange,
} from "@/src/hooks/user.hook";
import { IUser } from "@/src/types";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { any } from "zod";

const rows = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIVITY", uid: "activity" },
  { name: "ACTIONS", uid: "actions" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

interface IUserCardProps {
  users: IUser[];
}

export default function UserCard({ users }: IUserCardProps) {
  const { mutate: blockStatusChange } = useBlockStatusChange();
  const { mutate: roleStatusChange } = useRoleStatusChange();
  const { user: userInfo } = useUser();

  const handleStatusChange = (userId: string, currentIsBlock: boolean) => {
    // Toggle block status based on the current state
    let blockStatus = !currentIsBlock;
    const isBlock = blockStatus;

    blockStatusChange({ userId, isBlock });
  };

  const handleRoleChange = (userId: string, currentRole: string) => {
    // Toggle block status based on the current state
    let status;

    if (currentRole === "USER") {
      status = "ADMIN";
    } else {
      status = "USER";
    }

    const role = status;

    roleStatusChange({ userId, role });
  };

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {rows.map((row) => (
          <TableColumn key={row?.uid}>{row?.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user?.id}>
            <TableCell>{user?.name}</TableCell>
            <TableCell>{user?.role}</TableCell>
            <TableCell>
              <Chip className="capitalize" size="sm" variant="flat">
                {user?.status}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip className="capitalize" size="sm" variant="flat">
                {user?.isBlock ? "Blocked" : "Active"}
              </Chip>
            </TableCell>
            <TableCell>
              {userInfo?.id === user?._id ? (
                <Button
                  isDisabled
                  size="sm"
                  className="bg-[#27272A] px-3 py-1 rounded-md"
                >
                  Not Access
                </Button>
              ) : (
                <div
                  onClick={() =>
                    handleStatusChange(user?._id, user.isBlock as boolean)
                  }
                  className="cursor-pointer"
                >
                  {user?.isBlock ? (
                    <button className="bg-[#27272A] px-3 py-1 rounded-md">
                      UnBlock
                    </button>
                  ) : (
                    <button className="bg-[#27272A] px-3 py-1 rounded-md">
                      Block Now
                    </button>
                  )}
                </div>
              )}
            </TableCell>

            <TableCell>
              {userInfo?.id === user?._id ? (
                <Button
                  isDisabled
                  size="sm"
                  className="bg-[#27272A] px-3 py-1 rounded-md"
                >
                  Not Access
                </Button>
              ) : (
                <div
                  onClick={() => handleRoleChange(user?._id, user?.role)}
                  className="cursor-pointer"
                >
                  {user?.role === "ADMIN" ? (
                    <button className="bg-[#27272A] px-3 py-1 rounded-md">
                      Make User
                    </button>
                  ) : (
                    <button className="bg-[#27272A] px-3 py-1 rounded-md">
                      Make Admin
                    </button>
                  )}
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
