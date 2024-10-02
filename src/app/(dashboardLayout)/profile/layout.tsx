import Container from "@/src/components/Container";
import { ReactNode } from "react";

const ProfileLayout = ({
  children,
  profile,
}: {
  children: ReactNode;
  profile: ReactNode;
}) => {
  return (
    <Container>
      {profile} {/* profile fixed */}
      <div>{children}</div> {/* like --> contents , followed, followers page*/}
    </Container>
  );
};

export default ProfileLayout;
