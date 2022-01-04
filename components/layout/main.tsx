import { LayoutProps } from "models";
import Link from "next/link";
import React from "react";

interface MainLayoutProps {}

export const MainLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <h1>Main Layout</h1>
      <div>Sidebar</div>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <div>{children}</div>
    </div>
  );
};

// export default MainLayout;
