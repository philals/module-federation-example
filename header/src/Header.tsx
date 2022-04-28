import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import "./Header.css";

declare global {
  interface Window {
    theUser: any;
  }
}

function login() {
  window.theUser = {
    id: "phil",
    name: "Phil",
    permissions: ["admin", "user"],
  };

  const customEvent = new CustomEvent("userChange", {
    detail: {
      id: "phil",
      name: "Phil",
      permissions: ["admin", "user"],
    },
  });
  window.dispatchEvent(customEvent);
}

function logout() {
  window.theUser = undefined;

  const customEvent = new CustomEvent("userChange", {
    detail: undefined,
  });
  window.dispatchEvent(customEvent);
}

export default function () {
  const [user, setUser] = React.useState(window.theUser); // Replace with a hook which syncs with window or something

  const handleUserChange = (event: any) => {
    setUser(window.theUser);
  };

  useEffect(() => {
    window.addEventListener("userChange", handleUserChange);

    return () => {
      window.removeEventListener("userChange", handleUserChange);
    };
  }, [user]);

  return (
    <header>
      <div className="header">
        <a href="#default" className="logo">
          Current User: {window.theUser?.name}
        </a>
        <div className="header-right">
          <Link className="active" to="/">
            Home
          </Link>
          <Link to="/dealing">Dealing</Link>
          <Link to="/survey">Survey</Link>
          {window.theUser ? (
            <a
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Logout
            </a>
          ) : (
            <a
              href="#default"
              onClick={(e) => {
                e.preventDefault();
                login();
              }}
            >
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
