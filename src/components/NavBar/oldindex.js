import { TbBrandDjango, TbBrandAppgallery } from "react-icons/tb";
import {
  IoCart,
  IoChatbox,
  IoEarthOutline,
  IoNotificationsOutline,
  IoNotificationsSharp,
} from "react-icons/io5";
import NavBarButton from "../NavBarButton";
import { FaBars } from "react-icons/fa";
import NavBarItem from "../NavBarItem";
import "./index.css";
import {
  Button,
  Collapse,
  IconButton,
  Menu,
  MobileNav,
} from "@material-tailwind/react";
import DropDown from "../DropDown";
import UsersApi from "../../api/users";
import useApi from "../../hooks/useApi";
import NativeButtonWithLoading from "../NativeButtonWithLoading";
import { useEffect } from "react";
import { useState } from "react";
import ProtectedComponent from "../ProtectedComponent/ProtectedComponent";
import MustNotProtectedComponent from "../MustNotProtectedComponent/MustNotProtectedComponent";
import UserDropdownMenu from "../../modules/users/components/UserDropdownMenu/UserDropdownMenu";
import LanguagesDropdownMenu from "../LanguagesDropdownMenu";
import { BellIcon, ChatBubbleLeftEllipsisIcon, Cog6ToothIcon } from "@heroicons/react/20/solid";

const logoIcon = <TbBrandDjango size={40} color="FC4F00" />;

const notificationsIcon =         <BellIcon className="h-5 w-5" />
;

const chatsIcon =
<ChatBubbleLeftEllipsisIcon className="h-5 w-5" />;

export default function ({ auth_user }) {
  const [openNav, setOpenNav] = useState(false);
  const [openNav2, setOpenNav2] = useState(false);

  const logoutApi = useApi(UsersApi.logout);

  const handleLogout = () => {
    logoutApi.request().then(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      window.location.reload();
    });
  };

  const MobileUserDropdownMenu = () => {
    return (
      <>
        <a
          className="font-semibold text-gray-500 capitalize"
          onClick={() => setOpenNav2(!openNav2)}
        >
          {auth_user.name}
        </a>
        <Collapse open={openNav2}>
          <Menu.Item>
            <NavBarItem content="Account settings" to="/account_settings" />
          </Menu.Item>
          <Menu.Item>
            <NavBarItem content="Support" to="/support" />
          </Menu.Item>
          <Menu.Item>
            <NavBarItem content="License" to="/license" />
          </Menu.Item>
          <Menu.Item>
            <NativeButtonWithLoading
              className="w-full mx-4 font-semibold text-gray-500"
              onClick={handleLogout}
            >
              Log out
            </NativeButtonWithLoading>
          </Menu.Item>
        </Collapse>
      </>
    );
  };

  const navList = (
    <ul className=" md:flex md:items-center md:h-full">
      <ProtectedComponent>
      <li>
        <NavBarItem content="Dashboard" to="/" />
      </li>
      </ProtectedComponent>
      <ProtectedComponent>
        <li>
          <NavBarItem content="Users" to="/users" />
        </li>
      </ProtectedComponent>
      <ProtectedComponent>
        <li>
          <NavBarItem content="Restaurants" to="restaurants" />
        </li>
      </ProtectedComponent>
      <ProtectedComponent>
        <li>
          <NavBarItem content="Products" to="products" />
        </li>
      </ProtectedComponent>
    </ul>
  );
  const mobileNavList = (
    <div className="lg:hidden">
      <ProtectedComponent>
      <Menu.Item>
        <NavBarItem content="Dashboard" to="/" />
      </Menu.Item>
      </ProtectedComponent>
      <ProtectedComponent>
        <Menu.Item>
          <NavBarItem content="Users" to="/users" />
        </Menu.Item>
      </ProtectedComponent>
      <ProtectedComponent>
      <Menu.Item>
        <NavBarItem content="Restaurants" to="restaurants" />
      </Menu.Item>
      </ProtectedComponent>
      <ProtectedComponent>
      <Menu.Item>
        <NavBarItem content="Products" to="products" />
      </Menu.Item>
      </ProtectedComponent>
      <ProtectedComponent>
        <Menu.Item className="mx-4">
          <MobileUserDropdownMenu />
        </Menu.Item>
        </ProtectedComponent>
        <MustNotProtectedComponent>
        <>
          <Menu.Item>
            <NavBarItem content="Log In" to="login" />
          </Menu.Item>
          <Menu.Item>
            <NavBarItem content="Sign Up" to="signup" />
          </Menu.Item>
        </>
        </MustNotProtectedComponent>

    </div>
  );
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <nav className="md:px-20 px-10 pt-20 pb-5">
      <Collapse open={openNav}>{mobileNavList}</Collapse>
      <div className="w-full md:grid md:grid-cols-12 md:gap-2 flex justify-between items-center">
        <div className="col-span-2 flex justify-center items-center">
          <NavBarItem content={logoIcon} to="/" />
        </div>
        <div className="col-span-10 md:grid grid-cols-12">
          <div className="md:col-span-8 hidden md:block">{navList}</div>
          <div className="px-4 col-span-4 flex justify-end items-center">
            <div className="flex justify-end items-center">
              {auth_user && (
                <>
                  <IconButton variant="text" color="blue-gray">
                  <NavBarItem content={notificationsIcon} to="notifications" />

          </IconButton>
          <IconButton variant="text" color="blue-gray">
          <NavBarItem content={chatsIcon} to="chats" />

          </IconButton>
                </>
              )}
                <LanguagesDropdownMenu />
            </div>
            <div className="hidden md:block">
              {auth_user ? (
                <UserDropdownMenu
                  user_name={auth_user.name}
                  handleLogout={handleLogout}
                />
              ) : (
                <>
                  <NavBarButton text="Log In" to="login" />
                  <NavBarButton text="Sign Up" to="signup" />
                </>
              )}
            </div>

            <IconButton
              variant="text"
              className="col-span-1 md:hidden"
              onClick={() => setOpenNav(!openNav)}
            >
              <FaBars size={25} color="FC4F00" />
            </IconButton>
          </div>
        </div>
      </div>
    </nav>
  );
}
