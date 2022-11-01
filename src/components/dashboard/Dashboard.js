import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appConfig } from "../../Config";
import InitialAvatar from "../initialAvatar/InitialAvatar";
import TableComponent from "../Table/TableComponent";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";
var axios = require("axios");
function Dashboard() {
  const { state } = useLocation();
  const [generatescorePage, setGeneratescorePage] = useState();
  // const [state, setState] = React.useState({
  //   right: false,
  // });

  const [filteredData, setFilteredData] = useState([]);
  const [reports, setReports] = useState({
    total: "",
    highRisk: "",
    lowRisk: "",
  });
  const [userName, setUserName] = useState(
    state ? state.data : localStorage.getItem("user")
  );
  // useEffect(() => {
  //   let User = localStorage.getItem("user");
  //   setUserName(User);
  // }, []);
  const navigate = useNavigate();

  const onGenerateNewCreditScore = () => {
    navigate("/dashboard/generatenewcreditscore", {
      state: {
        data: {},
        action: "create",
      },
    });
  };
  const logoutUser = () => {
    localStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    const userToken = localStorage.getItem("awesomeLeadsToken");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${userToken}`,
    };
    axios
      .get(`${appConfig.baseURL}users/history`, {
        headers,
      })
      .then(function (response) {
        localStorage.setItem(
          "user",
          response.data ? response.data.username : ""
        );

        let reports = [];
        let highRiskReports = [];
        let lowRiskReports = [];
        let num = 0;
        for (let i = 0; i < response.data.Customers.length; i++) {
          for (
            let j = 0;
            j < response.data.Customers[i].Predictions.length;
            j++
          ) {
            num += +response.data.Customers[i].Predictions[j].CreditScore;

            if (j === 0) {
              reports.push({
                ...response.data.Customers[i],
                ConfidenceScore: response.data.Customers[i].Predictions[j]
                  .CreditScore
                  ? response.data.Customers[i].Predictions[j].CreditScore
                  : 0,
                PredictedLabel: response.data.Customers[i].Predictions[j]
                  .PredictedLabel
                  ? response.data.Customers[i].Predictions[j].PredictedLabel
                  : 0,
                averageScore: num ? num.toFixed(2) + "%" : 0,
              });
            }
          }
        }
        for (let i = 0; i < reports.length; i++) {
          if (reports[i].ConfidenceScore > 400) {
            lowRiskReports.push(reports[i]);
          } else {
            highRiskReports.push(reports[i]);
          }
        }
        setReports({
          total: reports.length,
          highRisk: highRiskReports.length,
          lowRisk: lowRiskReports.length,
        });
        setFilteredData(reports);
      })
      .catch(function (error) {});
  }, []);
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

      <div className="section">
        <div className="cards">
          <div className="rect1">
            <img
              id="rect1"
              src="/images/assignment_FILL0_wght300_GRAD0_opsz48@2x.png"
            ></img>
            <div className="flex">
              <p className="totalReportsLabel">Total Reports Generated</p>
              <h4 className="totalReportsValue">
                {reports ? reports.total : ""}
              </h4>
            </div>
          </div>

          <div className="rect2">
            <img
              id="rect1"
              src="/images/thumb_up_FILL0_wght300_GRAD0_opsz48@2x.png"
            ></img>
            <div className="flex">
              <p className="totalLowRiskReportsLabel">Low Risk Reports</p>
              <h4 className="totalLowRiskReportsValue">
                {reports ? reports.lowRisk : ""}
              </h4>
            </div>
          </div>

          <div className="rect3">
            <img
              id="rect1"
              src="/images/thumb_down_FILL0_wght300_GRAD0_opsz48@2x.png"
            ></img>
            <div className="flex">
              <p className="totalHighRiskReportsLabel">High Risk Reports</p>
              <h4 className="totalHighRiskReportsValue">
                {reports ? reports.highRisk : ""}
              </h4>
            </div>
          </div>
          <div>
            <button
              type="submit"
              onClick={onGenerateNewCreditScore}
              id="submit-btn"
              className="btn btn-primary btn-lg btn-block"
            >
              Generate A New Credit Score
            </button>
          </div>
        </div>
      </div>

      {/* container3 */}

      <div>
        <TableComponent data={filteredData} />
      </div>
    </div>
  );
}

export default Dashboard;
