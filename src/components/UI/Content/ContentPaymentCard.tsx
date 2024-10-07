"use client";

import { useState } from "react";
import { IContent } from "@/src/types";
import { useUser } from "@/src/context/user.provider";
import { useCreatePayment } from "@/src/hooks/content.hook";
import { useGetUserProfile } from "@/src/hooks/user.hook";
import AuthenticationModal from "../../modals/AuthenticationModal";

const ContentPaymentCard = ({ content }: { content: IContent }) => {
  const { user } = useUser();
  const { data: loggedUser } = useGetUserProfile(user?.email as string);

  const { mutate: handlePaymentMutate, data, isPending } = useCreatePayment();
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // Limit the displayed content to 200 characters if not expanded
  const displayedContent = isExpanded
    ? content?.content
    : content?.content?.slice(0, 200) +
      (content?.content?.length > 200 ? "..." : "");

  const handlePayment = () => {
    if (loggedUser) {
      // Perform payment mutation
      const user = loggedUser?._id as string;
      handlePaymentMutate({ user });
    }
  };

  if (data?.result) {
    window.location.href = data.payment_url;
  }

  return (
    <div>
      <div
        className="prose max-w-none prose-invert text-white"
        dangerouslySetInnerHTML={{ __html: displayedContent }}
      />

      {content?.content?.length > 100 && (
        <div>
          {/* If the user is not logged in */}
          {!loggedUser && <AuthenticationModal buttonText="See more..." />}

          {/* If the user is logged in but has BASIC status */}
          {loggedUser?.status === "BASIC" && (
            <button
              className="text-blue-500 hover:underline mt-2"
              onClick={handlePayment}
            >
              {isPending ? (
                <p className="bg-gray-900 p-1 rounded-lg">
                  payment processing..
                </p>
              ) : (
                <p className="bg-gray-900 p-1 rounded-lg">
                  {" "}
                  Pay now to see more..
                </p>
              )}
            </button>
          )}

          {/* If the user has PREMIUM status */}
          {loggedUser?.status === "PREMIUM" && (
            <button
              className="text-blue-500 hover:underline mt-2"
              onClick={toggleExpanded}
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ContentPaymentCard;
