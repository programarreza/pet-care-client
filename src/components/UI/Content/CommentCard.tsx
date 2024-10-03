import { getComments } from "@/src/services/Comment";
import { IComment } from "@/src/types";
import { Avatar } from "@nextui-org/avatar";

const CommentCard = async ({ contentId }: { contentId: string }) => {
  const { data: comments = [] } = await getComments(contentId);

  return (
    <div>
      {comments?.map((comment: IComment) => (
        <div className="flex gap-2 mx-3 bg-gray-900 mb-2 p-2 rounded-md">
          <div className="w-12 ">
            <Avatar src={comment?.user?.image} size="md" />
          </div>
          <div>
            <p>{comment?.user?.name}</p>
            {/* comments */}
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
      ))}
    </div>
  );
};

export default CommentCard;
