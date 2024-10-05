import { IContent } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { format } from "date-fns";
import Image from "next/image";
import premiumIcon from "../../../assets/premium.png";
import CreateComment from "../Comment/createComment";
import FollowCard from "../Follow/FollowCard";
import CommentCard from "./CommentCard";

const ContentCard = ({ content }: { content: IContent }) => {
  return (
    <div className="text-white shadow-lg rounded-lg overflow-hidden border mb-6">
      <div className="px-4 py-2">
        {/* User info */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Avatar src={content?.user?.image} alt="User Avatar" />
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
                  src={premiumIcon}
                  alt="premium icon"
                  height={40}
                  width={40}
                />
              )}
            </div>
          </div>
        </div>

        {/* Content area */}
        <div className="my-4">
          <div
            className="prose max-w-none text-white "
            dangerouslySetInnerHTML={{ __html: content?.content }}
          />
          {/* Image associated with the content */}
          {content?.image && (
            <div className="bg-gray-200 w-full mt-4">
              <Image
                src={content?.image}
                alt={content?.content}
                height={500}
                width={500}
                className="mx-auto"
              />
            </div>
          )}
        </div>

        {/* Like & comments area */}
        <div className="flex justify-between items-center border-y py-4 ">
          <div className="flex gap-2">
            <Button color="primary" variant="shadow">
              UpVote
            </Button>
            <Button color="secondary" variant="shadow">
              DownVote
            </Button>
          </div>

          <div>
            <Button color="success" variant="shadow">
              Comments
            </Button>
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
