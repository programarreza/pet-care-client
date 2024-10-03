import { IContent } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import { format } from "date-fns";

const ContentCard = ({ content }: { content: IContent }) => {
  return (
    <div className="text-white shadow-lg rounded-lg overflow-hidden">
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

          <div className="text-sm ">
            <p>{content?.status || "Flow / Flowing"}</p>
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
        <div className="flex justify-between items-center border-t py-4 px-2">
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
    </div>
  );
};

export default ContentCard;
