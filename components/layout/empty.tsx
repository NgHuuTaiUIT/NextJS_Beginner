import { LayoutProps } from "models";
import Link from "next/link";
import React from "react";

interface MainLayoutProps {}

export const EmptyLayout = ({ children }: LayoutProps) => {
  return <div>{children}</div>;
};

// export default EmptyLayout;
