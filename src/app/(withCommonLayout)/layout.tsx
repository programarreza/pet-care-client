import { ReactNode } from "react";

import Container from "@/src/components/Container";
import { Navbar } from "@/src/components/navbar";
import Sidebar from "@/src/components/UI/Sidebar";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Container>
        <Navbar />
        <div className="flex gap-2 md:gap-5">
          <div className="w-full mx-auto max-w-24 md:max-w-52 bg-[#101214] rounded-lg">
            <Sidebar />
          </div>
          <div className="w-full flex-1"> {children}</div>
        </div>
      </Container>
    </div>
  );
};

export default CommonLayout;
