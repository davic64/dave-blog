import { Sidebar } from "@/ui";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-10">{children}</div>
    </div>
  );
};

export default DashboardLayout;
