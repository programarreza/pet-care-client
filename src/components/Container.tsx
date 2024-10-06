import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-52 md:px-24 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
