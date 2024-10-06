import ContentCard from "@/src/components/UI/Content/ContentCard";
import { getMyContents } from "@/src/services/Content";
import { IContent } from "@/src/types";

const MyContents = async () => {
  const { data: contents } = await getMyContents();

  return (
    <div>
      {contents?.length > 0 ? (
        <div>
          {contents?.map((content: IContent, index: number) => (
            <ContentCard key={index} content={content} />
          ))}
        </div>
      ) : (
        <p className="text-center">You do not have any content of your own</p>
      )}
    </div>
  );
};

export default MyContents;
