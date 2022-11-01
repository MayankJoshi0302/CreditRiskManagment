import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../createCreditScore/GenerateNewCreditScore.css";
import InitialAvatar from "../initialAvatar/InitialAvatar";
import CircularProgressbar from "../layout/ProgressBar";
import ReactSpeedometer from "react-d3-speedometer";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import "./RiskReport.css";

function RiskReportdb() {
  let navigate = useNavigate();
  const { state } = useLocation();
  const values = ("state ", state.data.row);

  const scoreValue =
    ("statescore", state.data.row.Predictions[0].ConfidenceScore);

  const [score, setScore] = useState(scoreValue);
  const [riskValueName, setRiskValueName] = useState(values.Name);
  const [occupation, setOccupation] = useState(values.Occupation);
  const [reportModel, setReportModel] = useState("");
  const [employmentType, setEmploymentType] = useState(values.EmploymentType);
  const [houseOwnership, setHouseOwnership] = useState(values.HouseOwnership);
  const [numberOfDependants, setNumberOfDependants] = useState(
    values.NumberOfDependants
  );
  const [modelList, setModels] = useState(
    state.data.row ? state.data.row.Predictions : []
  );
  const [activeModel, setActiveModel] = useState(
    state.data.row ? state.data.row.Predictions[0] : {}
  );
  const [monthlySpend, setMonthlySpend] = useState(values.MonthlySpend);
  const [age, setAge] = useState(values.Age);
  const [monthlyIncome, setMonthlyIncome] = useState(values.NetMonthlyIncome);
  const [liabilities, setliabilities] = useState(values.TotalLiabilities);

  const data = localStorage.getItem("tableData");

  const NetMonthlyIncomeCal = parseFloat((monthlySpend / monthlyIncome) * 100);

  const NetMonthlyIncomeCalc = Math.floor(NetMonthlyIncomeCal);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    let User = localStorage.getItem("user");
    setUserName(User);
  }, []);
  function Handler() {
    setRiskValueName(values.Name);
    setEmploymentType(values.EmploymentType);
    setAge(values.Age);
    setMonthlyIncome(values.NetMonthlyIncome);
    setliabilities(values.TotalLiabilities);
    setMonthlySpend(values.MonthlySpend);
    setNumberOfDependants(values.NumberOfDependants);
    setOccupation(values.Occupation);
    setHouseOwnership(values.HouseOwnership);
    setScore(state.data.row.Predictions[0].ConfidenceScore);
  }

  // if (age >= 15 || age <= 25) {
  //   setAge("15-25");
  // } else if (age >= 26 || age <= 30) {
  //   setAge("25-30");
  // } else if (age >= 31 || age <= 35) {
  //   setAge("30-35");
  // } else if (age >= 36 || age <= 40) {
  //   setAge("35-40");
  // } else if (age >= 41 || age <= 45) {
  //   setAge("40-45");
  // } else {
  //   setAge("45-100");
  // }

  if (employmentType === "Contractual/Part time") {
    setEmploymentType("B");
  } else if (
    employmentType === "Full time/Regular/Probationary" ||
    employmentType === "Fulltime/Regular/Probationary"
  ) {
    setEmploymentType("A");
  } else if (employmentType === "Others") {
    setEmploymentType("C");
  }

  function handleClick() {
    navigate("/dashboard");
  }
  const logoutUser = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleModelChange = (e, value) => {
    setReportModel(value);
    const selectedModel = modelList.filter((model) => {
      return model.ModelId === value;
    });

    setActiveModel(selectedModel[0]);
  };
  return (
    <div style={{ backgroundColor: "#F4F4F4" }}>
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
      <div className="form-div">
        <form className="container">
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>
                {" "}
                <h2 style={{ marginLeft: "20px" }}>Risk Report</h2>
              </Form.Label>

              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Change to Experiment</Form.Label>
              <Form.Control
                required
                as="select"
                type="select"
                value={reportModel}
                onChange={(e, value) => handleModelChange(e, e.target.value)}
              >
                {modelList.map((model, index) => {
                  return (
                    <option value={model.ModelId}>
                      {index === 0
                        ? "Experiment 1 : Logistic Regression"
                        : index === 1
                        ? "Experiment 2 : Decision Tree"
                        : index === 2
                        ? "Experiment 3 : Random Forest"
                        : ""}
                    </option>
                  );
                })}
              </Form.Control>

              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
          </Row>
          <hr></hr>
          <div className="container-lg">
            <div className="container-md">
              <div className="header1">
                <h1>{riskValueName}</h1>
                <h6>
                  {" "}
                  As per details mentioned following are the generated credit
                  score and affecting parameters
                </h6>
                {/* <p >
                  As per details mentioned following are the generated credit
                  score and affecting parameters
                </p> */}
              </div>
              <div className="container-sm">
                <div className="flex1">
                  <div
                    id="pbar"
                    style={{
                      marginLeft: "25px",
                      stroke: "black",
                      marginTop: "40px",
                    }}
                  >
                    {/* <CircularProgressbar percentage={score} /> */}
                    <ReactSpeedometer
                      maxValue={765}
                      minValue={activeModel.CreditScore === 0 ? 0 : 235}
                      value={activeModel ? activeModel.CreditScore : 0}
                      needleColor="white"
                      startColor="red"
                      segments={5}
                      endColor="green"
                      width={231}
                      textColor="white"
                    />
                  </div>
                  <div>
                    <h3>Your Credit Score</h3>
                    {activeModel.CreditScore > 500 ? (
                      <h2
                        style={{
                          color: "green",
                          paddingTop: "15px",
                          textAlign: "center",
                          fontSize: "2em !important",
                        }}
                      >
                        {activeModel.CreditScore}
                      </h2>
                    ) : activeModel.CreditScore >= 400 && scoreValue <= 500 ? (
                      <h2
                        style={{
                          color: "#EB984E",
                          paddingTop: "15px",
                          textAlign: "center",
                          fontSize: "2em !important",
                        }}
                      >
                        {activeModel.CreditScore}
                      </h2>
                    ) : activeModel.CreditScore < 400 ? (
                      <h2
                        style={{
                          color: "red",
                          paddingTop: "15px",
                          textAlign: "center",
                          fontSize: "2em !important",
                        }}
                      >
                        {activeModel.CreditScore}
                      </h2>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="flex2">
                  <p>Risk Level</p>
                  {activeModel.CreditScore > 500 ? (
                    <div
                      className="flex3"
                      style={{ display: "flex", marginTop: "20px" }}
                    >
                      {" "}
                      <img src="/images/thumb_up_FILL0_wght300_GRAD0_opsz48@2x-1.png"></img>
                      <h1>Low</h1>
                    </div>
                  ) : activeModel.CreditScore >= 400 && scoreValue <= 500 ? (
                    <h2>
                      <CheckBoxIcon
                        style={{ color: "#EB984E", fontSize: "3em" }}
                      />
                      <span style={{ color: "#EB984E", fontSize: "1.5em" }}>
                        Medium
                      </span>
                    </h2>
                  ) : activeModel.CreditScore < 400 ? (
                    <div
                      className="flex3"
                      style={{ display: "flex", marginTop: "20px" }}
                    >
                      {" "}
                      <img
                        style={{ marginTop: "10px" }}
                        src="/images/thumb_down_FILL0_wght300_GRAD0_opsz48@2x.png"
                      ></img>
                      <h1 style={{ color: "#DC3E39" }}>High</h1>
                    </div>
                  ) : (
                    ""
                  )}
                  {/* {score >= 400 ? (
                    <div
                      className="flex3"
                      style={{ display: "flex", marginTop: "20px" }}
                    >
                      {" "}
                      <img src="/images/thumb_up_FILL0_wght300_GRAD0_opsz48@2x-1.png"></img>
                      <h1>Low</h1>
                    </div>
                  ) : (
                    <div
                      className="flex3"
                      style={{ display: "flex", marginTop: "20px" }}
                    >
                      {" "}
                      <img
                        style={{ marginTop: "10px" }}
                        src="/images/thumb_down_FILL0_wght300_GRAD0_opsz48@2x.png"
                      ></img>
                      <h1 style={{ color: "#DC3E39" }}>High</h1>
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          <div className="card-deck">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Net Income to Debt Ratio</h5>

                <div style={{ stroke: "green" }}>
                  <CircularProgressbar percentage={NetMonthlyIncomeCalc} />
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body" style={{ allignItems: "center" }}>
                <h5 className="card-title">Age Group</h5>

                <div style={{ stroke: "#DC3E39", marginTop: "40px" }}></div>
                {age >= 15 && age <= 25 ? (
                  <h6 className="text-1" style={{ color: "#4DABD9" }}>
                    15-25
                  </h6>
                ) : age >= 26 && age <= 30 ? (
                  <h6 className="text-1" style={{ color: "#4DABD9" }}>
                    25-30
                  </h6>
                ) : age >= 31 && age <= 35 ? (
                  <h6 className="text-1" style={{ color: "#4DABD9" }}>
                    30-35
                  </h6>
                ) : age >= 36 && age <= 40 ? (
                  <h6 className="text-1" style={{ color: "#4DABD9" }}>
                    35-40
                  </h6>
                ) : age >= 41 && age <= 45 ? (
                  <h6 className="text-1" style={{ color: "#4DABD9" }}>
                    40-45
                  </h6>
                ) : age >= 46 && age <= 100 ? (
                  <h6 className="text-1" style={{ color: "#4DABD9" }}>
                    45-100
                  </h6>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Employment Type </h5>

                <div style={{ stroke: "#DC3E39", marginTop: "40px" }}></div>
                <h6 className="text-1" style={{ color: "#4DABD9" }}>
                  {employmentType}
                </h6>
              </div>
            </div>
          </div>

          <div className="container-3">
            <div className="list-group">
              <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start active"
              >
                <div className="d-flex w-100 justify-content-between">
                  <p className="mb-1">Occupation</p>
                  <small className="text-muted">
                    {employmentType}| {occupation}
                  </small>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <p className="mb-1">Net Monthly Income</p>
                  <small className="text-muted">Rs {monthlyIncome}</small>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <p className="mb-1">House/Properties Owned</p>
                  <small className="text-muted">{houseOwnership}</small>
                </div>
              </a>
              <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <p className="mb-1">No. of Dependents</p>
                  <small className="text-muted">{numberOfDependants}</small>
                </div>
              </a>{" "}
              <a
                href="#"
                className="list-group-item list-group-item-action flex-column align-items-start"
              >
                <div className="d-flex w-100 justify-content-between">
                  <p className="mb-1">Active Loan</p>
                  <small className="text-muted">
                    {" "}
                    Total Debt: {liabilities}
                  </small>
                </div>
              </a>
            </div>
          </div>
        </form>
        <button
          type="button"
          id="back"
          onClick={handleClick}
          className="btn btn-outline-primary"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default RiskReportdb;
