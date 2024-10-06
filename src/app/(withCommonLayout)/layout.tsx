import Container from "@/src/components/Container";
import { Navbar } from "@/src/components/navbar";
import Sidebar from "@/src/components/UI/Sidebar";
import { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Container>
        <Navbar />
        <div className="flex gap-5">
          <div className="w-full max-w-52"><Sidebar /></div>
          <div className="w-full flex-1"> {children}</div>
        </div>
      </Container>
    </div>
  );
};

export default CommonLayout;
