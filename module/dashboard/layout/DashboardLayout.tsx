import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "store/store";
import Sidebar from "../components/Sidebar/Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

//render header on client side only
const Header = dynamic(() => import("@/dashboard/components/Header/Header"), {
  ssr: false,
});

const DashboardLayout = ({ children }: DashboardLayoutProps) => {

  return (
    <>
      <Toaster />
      <Provider store={store}>
        <Header />
      </Provider>
      <div className={`grid grid-cols-12 gap-12`}>
        <div className="sidebar-mobile col-span-2 ">
          <Sidebar />
        </div>
        <div className="col-span-12 xl:col-span-10">
          <main className="dashboard__wrapper">{children}</main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
