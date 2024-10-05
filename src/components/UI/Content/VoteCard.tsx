"use client";

import { useUser } from "@/src/context/user.provider";
import { useUpvote } from "@/src/hooks/content.hook";
import { IContent } from "@/src/types";
import { Button } from "@nextui-org/button";

interface IProps {
  totalVote: number;
  contentId: string;
}

const VoteCard = ({ totalVote, contentId }: IProps) => {
  const { mutate: handleUpVoteMutate } = useUpvote();
  const { user } = useUser();

  const handleUpVote = () => {
    let userId = user?.id as string; // Removed the comma here

    handleUpVoteMutate({ userId, contentId });

    console.log({ userId, contentId });
  };

  return (
    <div>
      <div className="flex gap-2">
        <Button onClick={handleUpVote} color="primary" variant="shadow">
          UpVote
        </Button>
        <p className="border px-4 py-1 rounded-md">{totalVote}</p>
        <Button color="secondary" variant="shadow">
          DownVote
        </Button>
      </div>
    </div>
  );
};

export default VoteCard;
