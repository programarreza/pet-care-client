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
          <Sidebar />
          <div className="w-2/4 border"> {children}</div>
        </div>
      </Container>
    </div>
  );
};

export default CommonLayout;
