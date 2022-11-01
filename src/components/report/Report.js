import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useParams } from "react-router-dom";
import InitialAvatar from "../initialAvatar/InitialAvatar";
import CRM_Report from "./CRM1-11-2022.pdf";
const Report = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  useEffect(() => {
    let User = localStorage.getItem("user");
    setUserName(User);
  }, []);
  const logoutUser = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <div>
        <nav className="navbar navbar-expand-md bg-white">
          <div className="container-fluid">
            <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
              <ul className="navbar-nav me-auto">
                {/* <li className="nav-item active">
                                <a className="nav-link" href="#">Left</a>
                            </li> */}
                <li className="nav-item active">
                  <img
                    className="nav-link"
                    src="/images/Logo@2x.png"
                    id="logo1"
                  />
                </li>
              </ul>
            </div>
            {/* <div className="mx-auto order-0">
                        <a className="navbar-brand mx-auto" href="#">Navbar 2</a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div> */}
            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/dashboard">
                    Dashboard
                  </a>
                </li>
                {/* <li className="nav-item">
                <a className="nav-link" href="#">
                  User
                </a>
              </li>{" "} */}
                <li className="nav-item">
                  <a className="nav-link" href="/report">
                    Report
                  </a>
                </li>{" "}
                <li className="nav-item">
                  {/* className="loginUser" */}
                  <a className="nav-link">{userName}</a>
                </li>
                <li style={{ marginRight: "15px" }}>
                  <InitialAvatar userName={userName}></InitialAvatar>
                </li>
                <li className="nav-item" onClick={logoutUser}>
                  <LogoutIcon className="logout" />
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div>
        <iframe
          src={CRM_Report}
          style={{ height: "100vh" }}
          frameborder="0"
          height="500px"
          width="100%"
        ></iframe>
      </div>
    </div>
  );
};

export default Report;
