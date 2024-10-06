import Container from "@/src/components/Container";
import CreateContentModal from "@/src/components/modals/CreateContentModal";
import DashboardSidebar from "@/src/components/UI/DashboardSidebar";
import NavbarDropdown from "@/src/components/UI/NavbarDropdown";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <div className="flex gap-5 pt-4">
        <div className="w-full max-w-52 ">
          <DashboardSidebar />
        </div>

        <div className="w-full flex-1">
          <div className="flex gap-4  justify-end">
            <div className="border rounded-lg">
              <CreateContentModal />
            </div>
            <NavbarDropdown />
          </div>
          {children}
        </div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
