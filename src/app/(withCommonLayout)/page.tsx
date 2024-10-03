import ContentCard from "@/src/components/UI/Content/ContentCard";
import { getContents } from "@/src/services/Content";
import { IContent } from "@/src/types";

const HomePage = async () => {
  const { data: contents } = await getContents();

  return (
    <div>
      {contents?.map((content: IContent, index: number) => (
        <ContentCard key={index} content={content} />
      ))}
    </div>
  );
};

export default HomePage;
