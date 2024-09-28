import Container from "@/src/components/Container";
import { Navbar } from "@/src/components/navbar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Container>
        <Navbar />
        {children}
      </Container>
    </div>
  );
};

export default CommonLayout;
