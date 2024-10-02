import ContentCard from "@/src/components/UI/Content/ContentCard";
import { getMyContents } from "@/src/services/Content";
import { IContent } from "@/src/types";

const MyContents = async () => {
  const {data: contents} = await getMyContents();
  console.log(contents);

  return (
    <div>
      {contents?.map((content: IContent, index: number) => (
        <ContentCard key={index} content={content} />
      ))}
    </div>
  );
};

export default MyContents;
