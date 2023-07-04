import { Outlet } from "react-router-dom";
import NotificationSideBar from "../components/NotificationSideBar";

const NotificationPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4">
        <NotificationSideBar />
      </div>
      <div className="col-span-8">
        <Outlet />
      </div>
    </div>
  );
};

export default NotificationPage;
