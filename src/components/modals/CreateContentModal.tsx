import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PCForm from "../form/PCForm";
import PCSelect from "../form/PCSelect";
import PCTextArea from "../form/PCTextArea";
import PCModal from "./PXModel";
import { Input } from "@nextui-org/input";
import { useCreateContent } from "@/src/hooks/content.hook";

const CreateContentModal = () => {
  const { user } = useUser();

  const { mutate: handleCreateContent, isPending: CreateContentPending } =
    useCreateContent();

  console.log(user);

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
      content: data.content,
      category: data.category,
      contentType: data.contentType,
    };

    formData.append("data", JSON.stringify(contentData));
    formData.append("image", data.image);
    console.log(contentData);

    handleCreateContent(formData);
  };

  return (
    <PCModal
      buttonClassName="flex-1"
      buttonText="Create Content"
      title="Create Content"
    >
      <PCForm onSubmit={onSubmit}>
        <div className="space-y-2">
          <PCTextArea label="Content" name="content" />
          <PCSelect
            options={categoriesOptions}
            label="Select Category"
            name="category"
          />
          <PCSelect
            options={contentTypeOptions}
            label="Select Content Type"
            name="contentType"
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
            {/* {isPending ? "Sending...." : "Send"} */}
            Post Now
          </Button>
        </div>
      </PCForm>
    </PCModal>
  );
};

export default CreateContentModal;
