import AllContentCard from "@/src/components/UI/Content/AllContentCard";
import { getContents, getMyContents } from "@/src/services/Content";

const AllContentsPage = async () => {
  const { data: contents } = await getContents();

  return (
    <div className="bg-[#18191A] rounded-md">
      <AllContentCard contents={contents} />
    </div>
  );
};

export default AllContentsPage;
