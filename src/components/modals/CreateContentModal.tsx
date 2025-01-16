"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";

import { useUser } from "@/src/context/user.provider";
import { useCreateContent } from "@/src/hooks/content.hook";

import "react-quill/dist/quill.snow.css";
import PCForm from "../form/PCForm";
import PCSelect from "../form/PCSelect";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreateContentModal = () => {
  const { user } = useUser();
  const [value, setValue] = useState("");
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const { mutate: handleCreateContent, isPending } = useCreateContent();

  const contentTypeOptions =
    user?.role == "ADMIN"
      ? [
          { key: "BASIC", label: "Basic" },
          { key: "PREMIUM", label: "Premium" },
        ]
      : [{ key: "BASIC", label: "Basic" }];

  const categoriesOptions = [
    { key: "STORY", label: "Story" },
    { key: "TIP", label: "Tip" },
  ];

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const contentData = {
      user: user?.id,
      content: value,
      category: data.category,
      contentType: data.contentType,
    };

    formData.append("data", JSON.stringify(contentData));
    formData.append("image", data.image);

    handleCreateContent(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <>
      <Button className="bg-transparent " size="sm" onPress={onOpen}>
        <h2>Create Content</h2>
      </Button>

      <Modal
        className="bg-black"
        isOpen={isOpen}
        size="md"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <ModalBody>
              {/* form area */}
              <PCForm onSubmit={onSubmit}>
                <div className="space-y-2">
                  {/* @ts-ignore */}
                  <ReactQuill
                    className="mb-[50px]"
                    style={{ height: "170px" }}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                  />
                  <PCSelect
                    label="Select Category"
                    name="category"
                    options={categoriesOptions}
                  />
                  <PCSelect
                    label="Select Content Type"
                    name="contentType"
                    options={contentTypeOptions}
                  />
                </div>
                <div className="py-3">
                  <Controller
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                      <Input
                        label="Content Image"
                        type="file"
                        value={value?.fileName}
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      />
                    )}
                  />
                </div>
                <div>
                  <Button className="w-full flex-1 mt-2" type="submit">
                    {isPending ? "Sending...." : "Post Now"}
                  </Button>
                </div>
              </PCForm>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateContentModal;
