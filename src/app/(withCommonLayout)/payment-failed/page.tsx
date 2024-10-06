import { Button } from "@nextui-org/button";
import Link from "next/link";

type SearchParams = {
  status: string;
};

const PaymentFailedPage = ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { status } = searchParams;
  return (
    <div className=" flex justify-center items-center min-h-screen bg-[#18191A]">
      <div className="text-center">
        <div className="flex justify-center items-center flex-col">
          <div className=" flex justify-center items-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-24 text-[#d3246c]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-semibold mt-4 text-[#d3246c]">
            Payment Failed
          </h2>
          <p className="text-lg mt-2">Payment Status: {status}</p>
        </div>

        <div className="flex justify-center items-center mt-4">
          <Link href="/">
            <Button className="text-white">Back to home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
