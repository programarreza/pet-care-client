"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useUser } from "@/src/context/user.provider";
import { useCreateComment } from "@/src/hooks/comment.hook";

const CreateComment = ({ contentId }: { contentId: string }) => {
  const { mutate: handleCreateContent } = useCreateComment();
  const { user } = useUser();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const commentData = {
      user: user?.id,
      content: contentId,
      comment: data.comment,
    };

    console.log(commentData);
    handleCreateContent(commentData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative px-3">
            <div className="py-3 relative">
              <input
                {...register("comment")}
                placeholder="Write a comment"
                type="text"
                className="w-full p-2 border rounded"
                // disabled={true}
              />
            </div>

            <button
              className="p-2 mr-3 absolute right-0 top-0 my-3 w-fit rounded-md hover:bg-default-900 font-semibold text-black bg-gray-500"
              type="submit"
            >
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComment;
