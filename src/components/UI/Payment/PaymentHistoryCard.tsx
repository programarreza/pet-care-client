"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { IPayment } from "@/src/types";

const rows = [
  { name: "NAME", uid: "name" },
  { name: "EMAIL", uid: "email" },
  { name: "STATUS", uid: "status" },
  { name: "AMOUNT", uid: "amount" },
  { name: "TranId", uid: "tranId" },
  // { name: "ACTIONS", uid: "actions" },
];

const PaymentHistoryCard = ({ payments }: { payments: IPayment[] }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const reactToPrintFn = useReactToPrint({ contentRef });

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="flex gap-1 bg-gray-900 hover:bg-gray-800 p-2 rounded-lg mb-4"
          tabIndex={0}
          onClick={() => reactToPrintFn()} // Correct usage here
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Download</span>
        </button>
      </div>
      <div ref={contentRef}>
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
                    {payment.paymentStatus}
                  </Chip>
                </TableCell>
                <TableCell>
                  <Chip className="capitalize" size="sm" variant="flat">
                    {payment.paymentAmount} BDT
                  </Chip>
                </TableCell>
                <TableCell>{payment.transactionId}</TableCell>
                {/* <TableCell>
                 dfgdsfgdf
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistoryCard;
