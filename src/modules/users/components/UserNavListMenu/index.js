import {
  Collapse,
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import NativeButtonWithLoading from "../../../../components/NativeButtonWithLoading";
import { useState } from "react";

export default ({ title, titleClassName = "", handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderItems = (
    <>
      <MenuItem>
        <a href="#" className="text-gray-700 block px-4 py-2 text-sm">
          Account settings
        </a>
      </MenuItem>
      <MenuItem>
        <a href="#" className="text-gray-700 block px-4 py-2 text-sm">
          Support
        </a>
      </MenuItem>
      <MenuItem>
        <a href="#" className="text-gray-700 block px-4 py-2 text-sm">
          License
        </a>
      </MenuItem>
      <MenuItem>
        <NativeButtonWithLoading
          className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
          onClick={handleLogout}
        >
          Log out
        </NativeButtonWithLoading>
      </MenuItem>
    </>
  );
  return (
    <div className="w-full">
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        className="w-full"
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-normal">
            <ListItem
              className={titleClassName.concat(
                " flex items-center gap-2 py-2 pr-4"
              )}
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              {title}
            </ListItem>
          </Typography>
        </MenuHandler>

        <MenuList className={`hidden  max-w-screen-xl  lg:block rounded-xl `}>
          <ul>{renderItems}</ul>
        </MenuList>
      </Menu>

      <div className="block lg:hidden ">
        <Collapse open={isMenuOpen}>{renderItems}</Collapse>
      </div>
    </div>
  );
};
