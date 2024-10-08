"use client";
import { Avatar } from "@nextui-org/avatar";
import { format } from "date-fns";
import Image from "next/image";

import { IContent } from "@/src/types";

import premiumIcon from "../../../assets/premium.png";
import CreateComment from "../Comment/createComment";
import FollowCard from "../Follow/FollowCard";

import CommentCard from "./CommentCard";
import VoteCard from "./VoteCard";
import ContentPaymentCard from "./ContentPaymentCard";

const ContentCard = ({ content }: { content: IContent }) => {
  return (
    <div className="text-white shadow-lg  overflow-hidden mb-6 bg-[#101214] rounded-lg">
      <div className="px-4 py-2">
        {/* User info */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar alt="User Avatar" src={content?.user?.image} />
            <div>
              <h3 className="font-bold">{content?.user?.name}</h3>
              <p className="text-xs ">
                {format(new Date(content?.createdAt), "dd MMM, yyyy")}
              </p>
            </div>
          </div>

          <div className="text-sm">
            <p className="bg-gray-900 p-1 rounded-lg">{content?.status}</p>

            {/* follow/unFollow */}
            <FollowCard content={content} />

            <div className=" ml-4">
              {content?.contentType === "PREMIUM" && (
                <Image
                  alt="premium icon"
                  height={40}
                  src={premiumIcon}
                  width={40}
                />
              )}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="my-4">
          <ContentPaymentCard content={content} />

          {/* Image associated with the content */}
          {content?.image && (
            <div className="bg-gray-200 w-full mt-4">
              <Image
                alt={content?.content}
                className="mx-auto"
                height={500}
                src={content?.image}
                width={500}
              />
            </div>
          )}
        </div>

        {/* voteCard or Like & comments area */}
        <div className="flex justify-between items-center border-y py-4 ">
          <div>
            <VoteCard content={content} />
          </div>

          <div>
            {/* <Button color="success" variant="shadow">
              Comments
            </Button> */}
          </div>
        </div>
      </div>

      {/* create comment */}
      <CreateComment contentId={content?._id} />

      {/* show all comments */}
      <CommentCard contentId={content?._id} />
    </div>
  );
};

export default ContentCard;
