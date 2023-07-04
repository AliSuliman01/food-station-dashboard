import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  IconButton,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { FaBars } from "react-icons/fa";

export default ({ openSidebar, setOpenSidbar }) => {
  return (
    <Card className={(openSidebar? " max-w-[20rem] " : " max-w-[6rem] min-w-[6rem] " )+"h-[600px] w-full  p-4 shadow-xl shadow-blue-gray-900/5"}>
      <div className="mb-2 p-4 flex justify-between items-center">
        {openSidebar && (
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        )}
        <IconButton variant="text" onClick={() => setOpenSidbar(!openSidebar)}>
          <FaBars size={20} color="FC4F00" />
        </IconButton>
      </div>
      <List className=" !min-w-[0px]">
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          {openSidebar && "Dashboard"}
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          {openSidebar && "E-Commerce"}
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          {openSidebar && (
            <>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </>
          )}
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          {openSidebar && "Profile"}
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          {openSidebar && "Settings"}
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          {openSidebar && "Log Out"}
        </ListItem>
      </List>
    </Card>
  );
};
