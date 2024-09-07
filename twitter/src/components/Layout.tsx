import { ReactNode } from "react";
import MenuList from "./Menu";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="layout">
      {children}
      <MenuList />
    </div>
  );
};
