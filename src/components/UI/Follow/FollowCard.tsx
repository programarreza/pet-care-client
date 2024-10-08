"use client";

import { useUser } from "@/src/context/user.provider";
import { useFollow, useUnFollow } from "@/src/hooks/user.hook";
import { IContent } from "@/src/types";

const FollowCard = ({ content }: { content: IContent }) => {
  const { mutate: handleFollowMutate, isPending: isPendingFollow } =
    useFollow();
  const { mutate: handleUnFollowMutate, isPending: isPendingUnFollow } =
    useUnFollow();
  const { user } = useUser();

  // Check if the current user is following the content's user
  const isFollowing = !!content?.user?.followers?.find(
    (follower) => follower === user?.id,
  );

  const handleFollow = async () => {
    try {
      const followData = {
        userId: user?.id,
        followingId: content?.user?._id,
      };

      handleFollowMutate(followData);

      console.log("handleFollow", followData);
    } catch (error) {
      console.error("Failed to follow:", error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const unFollowData = {
        userId: user?.id,
        followingId: content?.user?._id,
      };

      handleUnFollowMutate(unFollowData);

      console.log("unFollowData", unFollowData);
    } catch (error) {
      console.error("Failed to unfollow:", error);
    }
  };

  return (
    <div>
      {/* Follow/Unfollow button */}
      {user?.id !== content?.user?._id && (
        <div className="mt-4 mb-1">
          {isFollowing ? (
            <button
              className="bg-gray-900 p-2 rounded-lg"
              tabIndex={0}
              onClick={handleUnfollow}
            >
              {isPendingUnFollow ? "Unfollowing..." : "Unfollow"}
            </button>
          ) : (
            <button
              className="bg-gray-900 p-2 rounded-lg"
              tabIndex={0}
              onClick={handleFollow}
            >
              {isPendingFollow ? "Following.." : "Follow"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FollowCard;
