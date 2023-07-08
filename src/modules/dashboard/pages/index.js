import { Outlet } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import DashboardSideBar from "../components/DashboardSideBar";

const Dashboard = () => {
  const [state, setState] = useLocalStorage("usersOpenSlidbar", true);

  return (
    <div className="grid grid-cols-12">
      <div className={state ? "col-span-4" : "col-span-2"}>
        <DashboardSideBar openSidebar={state} setOpenSidbar={setState} />
      </div>
      <div className={state ? "col-span-8" : "col-span-10"}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
