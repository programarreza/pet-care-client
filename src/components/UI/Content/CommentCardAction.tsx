"use client";

import { useDeleteComment, useUpdateComment } from "@/src/hooks/comment.hook";
import { toast } from "sonner";
import PCModal from "../../modals/PCModel";
import Swal from "sweetalert2";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import PCInput from "../../form/PCInput";
import PCForm from "../../form/PCForm";
import { FieldValues, SubmitHandler } from "react-hook-form";

interface IProps {
  commentId: string;
  comment: string;
}

const CommentCardAction = ({ commentId, comment }: IProps) => {
  const { mutate: deleteComment, isPending } = useDeleteComment();
  const { mutate: updateComment, isPending: isPendingUpdateComment } =
    useUpdateComment();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      width: "350px",
      customClass: {
        popup: "bg-gray-800 text-white ",
        title: "text-white",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteComment(commentId, {
          onSuccess: () => {},
          onError: (error) => {
            toast.error(`Failed to delete comment: ${error.message}`);
          },
        });
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          width: "350px",
          customClass: {
            popup: "bg-gray-800 text-white ",
            title: "text-white",
          },
        });
      }
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const commentData = {
      comment: data.updateComment,
    };

    // Ensure you're calling the mutate function correctly
    updateComment(
      { commentId, updateComment: commentData }, // Pass both as a single object
      {
        onSuccess: () => {
          onOpenChange(); // Close the modal after success
        },
        onError: (error) => {
          toast.error(`Failed to update comment: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-2">
      <button className="" onClick={() => handleDelete()} disabled={isPending}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="size-6 text-[#C70000] "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>
      </button>

      <>
        <Button onPress={onOpen} className="p-0 m-0 w-0 h-8 bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 text-[#00ff00]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Update your comment
                </ModalHeader>
                <ModalBody>
                  <PCForm onSubmit={onSubmit}>
                    <div className="space-y-4">
                      <PCInput name="updateComment" defaultValue={comment} />
                      <Button className="w-full" type="submit">
                        Post
                      </Button>
                    </div>
                  </PCForm>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default CommentCardAction;
