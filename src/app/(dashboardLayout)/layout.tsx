import Container from "@/src/components/Container";
import DashboardSidebar from "@/src/components/UI/DashboardSidebar";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <div className="flex gap-5">
        <DashboardSidebar />
        <div className="w-full "> {children}</div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
