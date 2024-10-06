"use client";

import { useStatusChange } from "@/src/hooks/content.hook";
import { IContent } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
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
  { name: "Content", uid: "content" },
  { name: "CATEGORY", uid: "category" },
  { name: "CONTENT TYPE", uid: "content type" },
  { name: "STATUS", uid: "status" },
  { name: "PUBLISHING", uid: "publishing" },
  { name: "ACTIONS", uid: "actions" },
];

interface IProps {
  contents: IContent[];
}

export default function AllContentCard({ contents }: IProps) {
  const { mutate: StatusChangeMutate, isPending } = useStatusChange();
  //   const { mutate: roleStatusChange } = useRoleStatusChange();
  //   const { user: userInfo } = useUser();

  const handleStatusChange = (contentId: string, currentStatus: string) => {
    let status;

    if (currentStatus === "PUBLISH") {
      status = "UNPUBLISH";
    } else {
      status = "PUBLISH";
    }

    console.log(status);

    StatusChangeMutate({ contentId, status });
  };

  //   const handleRoleChange = (userId: string, currentRole: string) => {
  //     // Toggle block status based on the current state
  //     let status;

  //     if (currentRole === "USER") {
  //       status = "ADMIN";
  //     } else {
  //       status = "USER";
  //     }

  //     const role = status;

  //     roleStatusChange({ userId, role });
  //   };

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {rows.map((row) => (
          <TableColumn key={row?.uid}>{row?.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {contents.map((content) => (
          <TableRow key={content?._id}>
            <TableCell>
              <Avatar isBordered radius="lg" src={content?.image} />
            </TableCell>
            <TableCell>
              <div
                className="prose prose-invert max-w-none text-white"
                dangerouslySetInnerHTML={{
                  __html:
                    content?.content?.length > 50
                      ? content.content.slice(0, 50) + "..."
                      : content.content,
                }}
              />
            </TableCell>

            <TableCell>{content?.category}</TableCell>
            <TableCell>
              <Chip className="capitalize" size="sm" variant="flat">
                {content?.contentType}
              </Chip>
            </TableCell>
            <TableCell>{content?.status}</TableCell>
            <TableCell>
              <button
                onClick={() =>
                  handleStatusChange(content?._id, content?.status)
                }
                className="bg-[#27272A] px-3 py-1 rounded-md"
              >
                Change Status
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
