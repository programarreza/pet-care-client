"use client";

import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import PCForm from "../../form/PCForm";
import PCInput from "../../form/PCInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IUser } from "@/src/types";
import { useUpdateUser } from "@/src/hooks/user.hook";
import { toast } from "sonner";

interface IProps {
  user: IUser | null;
}

const UpdateProfile = ({ user }: IProps) => {
  const { mutate: updateUser } = useUpdateUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(user);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      name: data.name,
      phone: data.phone,
      address: data.address,
    };

    const userId = user?.id as string;
    console.log(userData, userId);

    updateUser(
      { userId, userData },
      {
        onSuccess: () => {
          onOpenChange();
        },
        onError: (error) => {
          toast.error(`Failed to update comment: ${error.message}`);
        },
      }
    );
  };

  return (
    <>
      <Button onPress={onOpen} className="p-0 m-0 w-0 h-8 bg-transparent">
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
                      name="name"
                      label="Name"
                      defaultValue={user?.name}
                    />
                    <PCInput
                      name="phone"
                      label="Phone"
                      defaultValue={user?.phone}
                    />
                    <PCInput
                      name="address"
                      label="Address"
                      defaultValue={user?.address}
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
