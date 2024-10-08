import { ReactNode } from "react";

import Container from "@/src/components/Container";
import { Navbar } from "@/src/components/navbar";
import DashboardSidebar from "@/src/components/UI/DashboardSidebar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Navbar />
      <div className="flex gap-2 md:gap-5">
        <div className="w-full max-w-32 md:max-w-52 ">
          <DashboardSidebar />
        </div>

        <div className="w-full flex-1">{children}</div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
