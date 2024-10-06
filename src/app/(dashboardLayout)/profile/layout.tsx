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
      {profile} {/* profile fixed */}
      <div>{children}</div> {/* like --> contents , followed, followers page*/}
    </div>
  );
};

export default ProfileLayout;
