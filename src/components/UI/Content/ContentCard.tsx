import { IContent } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { format } from "date-fns";

const ContentCard = ({ content }: { content: IContent }) => {
  return (
    <div>
      <div className="px-4 py-2">
        {/* user info */}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Avatar src={content?.user?.image} />
            <div>
              <h3>{content?.user?.name}</h3>
              <p className="text-xs">
                {format(new Date(content?.createdAt), "dd MMM, yyyy")}
              </p>
            </div>
          </div>

          <div>
            <p>Flow / Flowing</p>
          </div>
        </div>

        {/* content area */}
        <div>
          <p className="py-3">{content?.content}</p>

          <div className="bg-[#4D4D4D] w-full">
            <Image
              src={content?.image}
              alt={content?.content}
              height={500}
              width={500}
              className="mx-auto "
            />
          </div>
        </div>

        {/* Like & comments area */}
        <div className="flex justify-between items-center border-b py-4 px-2 ">
          <div className="flex gap-2 ">
            <Button>upVote</Button>
            <Button>downVote</Button>
          </div>

          <div>
            <Button>Comments</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
