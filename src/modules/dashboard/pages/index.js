import DashboardSideBar from "../components/DashboardSideBar";

const Dashboard =  () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-4">
      <DashboardSideBar />
      </div>
      <div className="col-span-8">
      </div>
    </div>
  );
}

export default Dashboard