"use client";
import { IPayment } from "@/src/types";
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

const rows = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status" },
  { name: "AMOUNT", uid: "amount" },
  { name: "TranId", uid: "tranId" },
  { name: "ACTIONS", uid: "actions" },
];

const PaymentHistoryCard = ({ payments }: { payments: IPayment[] }) => {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {rows.map((row) => (
          <TableColumn key={row?.uid}>{row?.name}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment?._id}>
            <TableCell>{payment?.user?.name}</TableCell>
            <TableCell>{payment?.user?.email}</TableCell>
            <TableCell>
              <Chip className="capitalize" size="sm" variant="flat">
                {payment?.paymentStatus}
              </Chip>
            </TableCell>
            <TableCell>
              <Chip className="capitalize" size="sm" variant="flat">
                {payment?.paymentAmount} BDT
              </Chip>
            </TableCell>
            <TableCell>{payment?.transactionId}</TableCell>
            <TableCell>
              {/* Add appropriate action buttons here */}
              <Button size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                  />
                </svg>
                download
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default PaymentHistoryCard;
