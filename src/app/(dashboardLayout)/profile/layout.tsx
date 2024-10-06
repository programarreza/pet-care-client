import Container from "@/src/components/Container";
import CreateContentModal from "@/src/components/modals/CreateContentModal";
import NavbarDropdown from "@/src/components/UI/NavbarDropdown";
import { ReactNode } from "react";

const ProfileLayout = ({
  children,
  profile,
}: {
  children: ReactNode;
  profile: ReactNode;
}) => {
  return (
    // <Container>
    <div className="m-2">
      {/* <div className="flex gap-4  justify-end">
        <div className="border rounded-lg">
          <CreateContentModal />
        </div>

        <NavbarDropdown />
      </div> */}
      {profile} {/* profile fixed */}
      <div>{children}</div> {/* like --> contents , followed, followers page*/}
    </div>
  );
};

export default ProfileLayout;
{
  /* </Container> */
}
