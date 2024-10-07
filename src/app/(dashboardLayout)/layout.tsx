import Container from "@/src/components/Container";
import { Navbar } from "@/src/components/navbar";
import DashboardSidebar from "@/src/components/UI/DashboardSidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Navbar />
      <div className="flex gap-5">
        <div className="w-full max-w-52 ">
          <DashboardSidebar />
        </div>

        <div className="w-full flex-1">{children}</div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
