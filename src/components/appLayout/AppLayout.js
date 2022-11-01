import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const AppLayout = () => {
  return (
    <div className="main_section">
      <Navbar></Navbar>;<Outlet></Outlet>
    </div>
  );
};

export default AppLayout;
