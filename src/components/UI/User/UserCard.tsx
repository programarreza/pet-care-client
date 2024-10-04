"use client";

import { IUser } from "@/src/types";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

const rows = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIVITY", uid: "activity" },
  { name: "ACTIONS", uid: "actions" },
];


const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function UserCard({ users }: { users: IUser[] }) {
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
            <Chip
              className="capitalize"
              // color={statusColorMap[column.status]}
              size="sm"
              variant="flat"
            >
              {user?.status}
            </Chip>
          </TableCell>
          <TableCell>
            {user?.isBlock ? (
              <Chip className="capitalize" size="sm" variant="flat">
                Block
              </Chip>
            ) : (
              <Chip className="capitalize" size="sm" variant="flat">
                Active
              </Chip>
            )}
          </TableCell>
          <TableCell>
            {/* You can add action buttons or links here */}
            <button>Edit</button>
          </TableCell>
        </TableRow>
         ))} 
      </TableBody>
    </Table>
  );
}
