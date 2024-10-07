import UserCard from "@/src/components/UI/User/UserCard";
import { getUsers } from "@/src/services/UserService";

const UsersPage = async () => {
  const { data: users = [] } = await getUsers();

  return (
    <div className="mt-4 bg-[#101214]">
      <UserCard users={users}/>
    </div>
  );
};

export default UsersPage;
