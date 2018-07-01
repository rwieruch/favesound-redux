import React from "react";

import Logo from "../Logo";
import MenuList from "../MenuList";
import SessionAction from "../SessionAction";

const Header = () => {
  return (
    <div className="header">
      <div className="header-content">
        <Logo />
        <MenuList />
        <SessionAction />
      </div>
    </div>
  );
};

export default Header;
