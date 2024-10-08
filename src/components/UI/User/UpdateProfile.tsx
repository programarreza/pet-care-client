"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { IUser } from "@/src/types";
import { useUpdateUser } from "@/src/hooks/user.hook";

import PCForm from "../../form/PCForm";
import PCInput from "../../form/PCInput";

interface IProps {
  user: IUser | null;
}

const UpdateProfile = ({ user }: IProps) => {
  const { mutate: updateUser } = useUpdateUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      name: data.name,
      phone: data.phone,
      address: data.address,
    };

    const userId = user?._id as string;

    updateUser(
      { userId, userData },
      {
        onSuccess: () => {
          onOpenChange();
        },
        onError: (error) => {
          toast.error(`Failed to update comment: ${error.message}`);
        },
      },
    );
  };

  return (
    <>
      <Button className="p-0 m-0 w-0 h-8 bg-transparent" onPress={onOpen}>
        <p>Edit Profile</p>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update your Information
              </ModalHeader>
              <ModalBody>
                <PCForm onSubmit={onSubmit}>
                  <div className="space-y-4">
                    <PCInput
                      defaultValue={user?.name}
                      label="Name"
                      name="name"
                    />
                    <PCInput
                      defaultValue={user?.phone}
                      label="Phone"
                      name="phone"
                    />
                    <PCInput
                      defaultValue={user?.address}
                      label="Address"
                      name="address"
                    />
                    <Button className="w-full" type="submit">
                      Update
                    </Button>
                  </div>
                </PCForm>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateProfile;
