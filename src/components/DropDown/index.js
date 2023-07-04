import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { ListItem, Menu, MenuHandler, MenuList, Typography } from "@material-tailwind/react";
import { Transition } from "@headlessui/react";

export default function ({
  title,
  children,
  withArrow = true,
  width,
  height,
  titleClassName = "",
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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
            className={titleClassName.concat(" flex items-center gap-2 py-2 pr-4")}
            selected={isMenuOpen || isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((cur) => !cur)}
          >
            {title}
            {withArrow && (
              <>
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
              </>
            )}
          </ListItem>
        </Typography>
      </MenuHandler>

      <MenuList
       className={`hidden min-w-[${width}px] max-w-[${width}px] max-h-[${height}px] lg:block rounded-md no-scrollbar overflow-y-scroll`}
>
          <ul>{children}</ul>
        </MenuList>
    </Menu>
  );
}
