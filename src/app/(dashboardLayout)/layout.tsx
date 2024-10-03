import Container from "@/src/components/Container";
import DashboardSidebar from "@/src/components/UI/DashboardSidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <div className="flex gap-5 ">
        <div className="w-1/4 border ">
          <DashboardSidebar />
        </div>
        <div className="border w-9/12"> {children}</div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
