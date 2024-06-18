import SidebarComponent from "@/components/Sidebar/SidebarComponent";
const Layout = ({ children }) => {

  return (
    <div className="relative">
      <div className="flex h-screen">
        <SidebarComponent  />
        <div className={"overflow-y-auto flex-1"}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

