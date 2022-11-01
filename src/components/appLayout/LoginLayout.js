import React from "react";
import { Outlet } from "react-router-dom";

const LoginLayout = ({}) => {
  return (
    <div className="main_section">
      <Outlet></Outlet>
    </div>
  );
};

export default LoginLayout;
