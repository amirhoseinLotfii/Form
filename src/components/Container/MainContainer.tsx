import React, { ReactNode } from "react";

const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-between px-14 ">{children}</div>
  );
};

export default MainContainer;
