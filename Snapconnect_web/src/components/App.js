import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import Main from "./Main";

import { TOKEN_KEY } from "../constants";
import "../styles/App.css";
import TopBar from "./TopBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem(TOKEN_KEY) ? true : false
  );

  const loggedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsLoggedIn(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem(TOKEN_KEY);
  };
  return (
    <div className="App">
      <TopBar isLoggedIn={isLoggedIn} handleLogout={logout} />
      <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
    </div>
  );
}

export default App;
