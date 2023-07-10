import React, { useEffect } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Chip,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  Bars3Icon,
  XMarkIcon,
  FlagIcon,
  ChatBubbleOvalLeftIcon,
  UsersIcon,
  FolderIcon,
  Square3Stack3DIcon,
  RocketLaunchIcon,
  FaceSmileIcon,
  PuzzlePieceIcon,
  GiftIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftEllipsisIcon,
  BellIcon,
} from "@heroicons/react/24/outline";
import ProtectedComponent from "../ProtectedComponent/ProtectedComponent";
import NavBarItem from "../NavBarItem";
import { NavLink } from "react-router-dom";
import MustNotProtectedComponent from "../MustNotProtectedComponent/MustNotProtectedComponent";
import LanguagesDropdownMenu from "../LanguagesDropdownMenu";
import { TbBrandDjango } from "react-icons/tb";
import "./index.css";
import useApi from "../../hooks/useApi";
import UsersApi from "../../api/users";
import UserNavListMenu from "../../modules/users/components/UserNavListMenu";

const colors = {
  blue: "bg-blue-50 text-blue-500",
  orange: "bg-orange-50 text-orange-500",
  green: "bg-green-50 text-green-500",
  "blue-gray": "bg-blue-gray-50 text-blue-gray-500",
  purple: "bg-purple-50 text-purple-500",
  teal: "bg-teal-50 text-teal-500",
  cyan: "bg-cyan-50 text-cyan-500",
  pink: "bg-pink-50 text-pink-500",
};

const notificationsIcon = <BellIcon className="h-[18px] w-[18px]" />;
const chatsIcon = <ChatBubbleLeftEllipsisIcon className="h-[18px] w-[18px]" />;
const logoIcon = <TbBrandDjango size={40} />;

const navListMenuItems = [
  {
    color: "blue",
    icon: UsersIcon,
    title: "Users",
    description: "We are always looking for talented people. Join us!",
    to: "/users",
  },
  {
    color: "green",
    icon: BuildingStorefrontIcon,
    title: "Restaurants",
    description: "Learn about our story and our mission statement.",
    to: "/restaurants",
  },
  {
    color: "purple",
    icon: RocketLaunchIcon,
    title: "Products",
    description: "Checkout our products that helps a startup running.",
    to: "/products",
  },
  {
    color: "cyan",
    icon: PuzzlePieceIcon,
    title: "Ingredients",
    description: "High quality UI Kits helps you to 2x faster.",
    to: "/ingredients",
  },
  {
    color: "blue-gray",
    icon: FolderIcon,
    title: "Categories",
    description: "All the stuff that we dan from legal made us add.",
    to: "/categories",
  },
  {
    color: "teal",
    icon: FaceSmileIcon,
    title: "Orders",
    description: "Set of beautiful icons that you can use in your project.",
    to: "/orders",
  },
  {
    color: "orange",
    icon: ChatBubbleOvalLeftIcon,
    title: "Carts",
    description: "News and writings, press releases, and resources",
    to: "/carts",
  },
  {
    color: "pink",
    icon: GiftIcon,
    title: "Open Source",
    description: "List of all our open-source projects, it's all free.",
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(
    ({ icon, title, description, color, to }, key) => (
      <NavLink to={to} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className={`rounded-lg p-5 ${colors[color]}`}>
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm"
            >
              {title}
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              {description}
            </Typography>
          </div>
        </MenuItem>
      </NavLink>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              <Square3Stack3DIcon className="h-[18px] w-[18px]" />
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}


function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <ProtectedComponent>
        <NavListMenu />

        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            <CubeTransparentIcon className="h-[18px] w-[18px]" />
            UI
          </ListItem>
        </Typography>
      </ProtectedComponent>
    </List>
  );
}

export default () => {
  const [openNav, setOpenNav] = React.useState(false);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const logoutApi = useApi(UsersApi.logout);

  const handleLogout = () => {
    logoutApi.request().then(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      window.location.reload();
    });
  };

  return (
    <Navbar
      className="
    mx-auto
    sm:max-w-screen-sm 
    md:max-w-screen-md 
    lg:max-w-screen-lg
    xl:max-w-screen-xl
    
     px-4 py-2 
      mt-20 mb-5"
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer lg:ml-2"
        >
          <NavLink to="/" className="flex text-main items-center">
            {logoIcon} <span className="ml-2"> dj could kitchen </span>
          </NavLink>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="hidden gap-2 lg:flex items-center">
          <ProtectedComponent>
            <IconButton variant="text" color="blue-gray">
              <NavBarItem content={notificationsIcon} to="notifications" />
            </IconButton>
            <IconButton variant="text" color="blue-gray">
              <NavBarItem content={chatsIcon} to="chats" />
            </IconButton>
          </ProtectedComponent>

          <LanguagesDropdownMenu />

          <ProtectedComponent>
            <UserNavListMenu
              title={
                <Typography
                  as="text"
                  variant="small"
                  color="blue-gray"
                  className="font-normal flex items-center gap-2"
                >
                    <UserCircleIcon className="h-[18px] w-[18px]" />
                    Account
                </Typography>
              }
              handleLogout={handleLogout}
            />
          </ProtectedComponent>

          <MustNotProtectedComponent>
            <NavLink
              className=" text-blue-gray-500 flex items-center"
              to="login"
            >
              <Button className="text-inherit" variant="text" size="sm">
                Log In
              </Button>
            </NavLink>
            <NavLink
              className="rounded-md text-blue-gray-500 flex items-center"
              to="signup"
            >
              <Button variant="text" className="text-inherit" size="sm">
                Sign Up
              </Button>
            </NavLink>
          </MustNotProtectedComponent>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <div className="p-0 flex w-full flex-nowrap items-center gap-2 ">
         
        <ProtectedComponent>
            <UserNavListMenu
              title={
                <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-normal flex items-center gap-2  w-full"
              >
                <UserCircleIcon className="h-[18px] w-[18px]" />
                Account
              </Typography>
              }
              handleLogout={handleLogout}
            />
          </ProtectedComponent>
          <MustNotProtectedComponent>
            <NavLink
              className="outline-main-btn border-1 border-blue-gray-500 w-full  text-blue-gray-500 flex items-center"
              to="login"
            >
              <Button
                variant="outlined"
                className="text-inherit border-inherit"
                size="sm"
                fullWidth
              >
                Log In
              </Button>
            </NavLink>
            <NavLink
              className="outline-main-btn border-1 border-blue-gray-500 w-full text-blue-gray-500 flex items-center"
              to="signup"
            >
              <Button
                variant="outlined"
                className="text-inherit border-inherit"
                size="sm"
                fullWidth
              >
                Sign Up
              </Button>
            </NavLink>
          </MustNotProtectedComponent>
        </div>
      </Collapse>
    </Navbar>
  );
};
