import UserSideBar from "../../components/UserSideBar";
import UsersDataTable from "../../components/UsersDataTable/UsersDataTable";
import useLocalStorage from "../../../../hooks/useLocalStorage";

const Users = () => {
  const [state, setState] = useLocalStorage('usersOpenSlidbar', true);

  return (
    <div className="grid grid-cols-12">
      <div className={state ? "col-span-4" : "col-span-2"}>
        <UserSideBar openSidebar={state} setOpenSidbar={setState} />
      </div>
      <div className={state ? "col-span-8" : "col-span-10"}>
        <UsersDataTable />
      </div>
    </div>
  );
};

export default Users;
