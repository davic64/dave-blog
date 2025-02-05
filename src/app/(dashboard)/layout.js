import { Sidebar } from "@/ui";
import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen">
      <Sidebar />
      <div className="flex-1 ml-64 p-10">
        <Toaster />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
