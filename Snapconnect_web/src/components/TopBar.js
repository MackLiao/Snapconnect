import React from "react";
import logo from "../assets/images/logo.svg";

import "../styles/TopBar.css";

import { LogoutOutlined } from "@ant-design/icons";

const TopBar = (props) => {
  const { isLoggedIn, handleLogout } = props;
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <span className="App-title">Around Web</span>
      {isLoggedIn && (
        <LogoutOutlined className="logout" onClick={handleLogout} />
      )}
    </header>
  );
};

export default TopBar;
