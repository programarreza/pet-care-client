"use client";

import { Avatar } from "@nextui-org/avatar";

import { useGetComments } from "@/src/hooks/comment.hook";
import { IComment } from "@/src/types";

import CommentCardAction from "./CommentCardAction";

const CommentCard = ({ contentId }: { contentId: string }) => {
  const { data: comments } = useGetComments(contentId);

  return (
    <div>
      {comments?.map((comment: IComment, index: number) => (
        <div
          key={index}
          className="flex justify-between gap-2 mx-3 bg-gray-900 mb-2 p-2 rounded-md "
        >
          <div className="flex">
            <div className="w-12 ">
              <Avatar size="md" src={comment?.user?.image} />
            </div>
            <div>
              <p>{comment?.user?.name}</p>

              <p>
                {comment?.comment?.length > 120 ? (
                  <>
                    {comment?.comment.slice(0, 120)}
                    <span style={{ color: "blue", cursor: "pointer" }}>
                      {" "}
                      See more...
                    </span>
                  </>
                ) : (
                  comment?.comment || "............"
                )}
              </p>
            </div>
          </div>

          <CommentCardAction
            comment={comment?.comment}
            commentId={comment?._id}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentCard;
