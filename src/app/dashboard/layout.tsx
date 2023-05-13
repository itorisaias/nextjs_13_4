import { ReactNode } from "react";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: "Dashboard Title",
  description: "Dasboard description",
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <h1>Dasboard Layout</h1>
      {children}
    </div>
  );
}
