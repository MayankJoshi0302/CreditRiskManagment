import "./GenerateNewCreditScore.css";
import { ErrorResponse } from "@remix-run/router";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import StaticData from "../staticData/StaticData";
import axios from "axios";
import { appConfig } from "../../Config";
import Alert from "../alert/Alert";
import LogoutIcon from "@mui/icons-material/Logout";
import InitialAvatar from "../initialAvatar/InitialAvatar";

function GenerateNewCreditScore() {
  const { state } = useLocation();
  const navigate = useNavigate();
  let staticMasterData = StaticData.staticData;
  const [staticData, setStaticData] = [staticMasterData];
  const [validated, setValidated] = useState(false);
  const [flag, setFlag] = useState(false);
  const [riskReport, setriskReport] = useState(true);
  const [Name, setName] = useState(state.data.Name);
  const [Email, setEmail] = useState(state.data.Email);
  const [Mobile, setMobile] = useState(state.data.Mobile);
  const [City, setCity] = useState(state.data.City);
  const [State, setState] = useState(state.data.State);
  const [Age, setAge] = useState(state.data.Age);
  const [Qualification, setQualification] = useState(state.data.Qualification);
  const [Occupation, setOccupation] = useState(state.data.Occupation);
  const [RepaymentType, setRepaymentType] = useState(state.data.RepaymentType);
  // const [Guarantors, setGuarantors] = useState()

  const [EmploymentType, setEmploymentType] = useState(
    state.data.EmploymentType
  );
  const [HouseOwnership, setHouseOwnership] = useState(
    state.data.HouseOwnership
  );
  const [NumberOfDependants, setNumberOfDependants] = useState(
    state.data.NumberOfDependants
  );
  const [NetMonthlyIncome, setNetMonthlyIncome] = useState(
    state.data.NetMonthlyIncome
  );
  const [IsActiveLiabilities, setIsActiveLiabilities] = useState(
    state.data.IsActiveLiabilities
  );
  const [TotalLiabilities, setTotalLiabilities] = useState(
    state.data.TotalLiabilities
  );
  const [MonthlySpend, setMonthlySpend] = useState(state.data.MonthlySpend);
  let formObj = {};
  const [form, setForm] = useState(state.action === "update" ? state.data : {});

  const [errors, setErrors] = useState({});
  const [userName, setUserName] = useState("");
  useEffect(() => {
    let User = localStorage.getItem("user");
    setUserName(User);
  }, []);

  const setField = (field, value) => {
    if (field === "age") {
      if (value >= 60 || value <= 15) {
        Alert.error("Enter age between 15-60");
      }
    }

    //  const setField = (field, value) => {
    //   if(field === "guarantors"){
    //     if(value > 5){
    //       Alert.error("hhjhjjh")
    //     }
    //   }
    //  }

    if (state.action === "update") {
      setForm({
        [field]: value,
        ...form,
      });
    } else {
      setForm({
        ...form,
        [field]: value,
      });
    }

    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };
  console.log(staticData);

  const validateForm = () => {
    const {
      name,
      email,
      number,
      city,
      state,
      occupation,
      income,
      qualification,
      spend,
      age,
      dependents,
      liabilities1,
      house,
      employment,
      RepaymentType,
      // guarantors
    } = form;
    const newErrors = {};

    if (!name || name === "") newErrors.name = "Please Enter Name";

    if (!email || email === "") newErrors.email = "Please Enter Email";

    if (!number || number === "")
      newErrors.number = "Please Enter Phone Number";

    if (!state || state === "") newErrors.state = "Please Enter City";

    //    if(!occupation || occupation ==='')
    //    newErrors.occupation = "Please Enter City"

    //    if(!qualification || qualification ==='')
    //    newErrors.qualification = "Please Enter Qualification"

    if (!spend || spend === "") newErrors.spend = "Please Enter Expenditure";

    if (!city || city === "") newErrors.city = "Please Enter City";

    if (!liabilities1 || liabilities1 === "")
      newErrors.liabilities1 = "Please Enter Liabilties";

    if (!income || income === "") newErrors.income = "Please Enter Income";

    if (!age || age === "") newErrors.age = "Please Enter Income";

    if (!dependents || dependents === "")
      newErrors.dependents = "Please Enter Income";

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const forms = event.currentTarget;
    if (forms.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    // const inputObj = {
    //   Email: form.Email,
    //   Name: form.Name,
    //   Mobile: form.Mobile,
    //   City: form.City,
    //   State: form.State,
    //   Age: form.Age,
    //   Qualification: form.Qualification,
    //   Occupation: form.Occupation,
    //   EmploymentType: form.EmploymentType,
    //   HouseOwnership: form.HouseOwnership,
    //   NumberOfDependants: form.NumberOfDependants,
    //   NetMonthlyIncome: form.NetMonthlyIncome,
    //   IsActiveLiabilities: form.IsActiveLiabilities,
    //   TotalLiabilities: form.TotalLiabilities,
    //   MonthlySpend: form.MonthlySpend,
    // };
    let IsActiveLiabilities = 0;

    if (state.action === "update") {
      if (IsActiveLiabilities === "Yes") {
        IsActiveLiabilities = 1;
      }
    } else {
      if (IsActiveLiabilities === "Yes") {
        IsActiveLiabilities = 1;
      } else {
        IsActiveLiabilities = 0;
      }
    }

    const inputObj = {
      Email: state.action === "update" ? Email : form.email,
      Name: state.action === "update" ? Name : form.name,
      Mobile: state.action === "update" ? Mobile : form.number,
      City: state.action === "update" ? City : form.city,
      State: state.action === "update" ? State : form.state,
      Age: state.action === "update" ? parseFloat(Age) : form.age,
      Qualification:
        state.action === "update" ? Qualification : form.qualificationType,
      Occupation: state.action === "update" ? Occupation : form.occupationType,
      EmploymentType:
        state.action === "update" ? EmploymentType : form.employeeType,
      HouseOwnership:
        state.action === "update" ? HouseOwnership : form.houseOwnership,
      NumberOfDependants:
        state.action === "update"
          ? parseFloat(NumberOfDependants)
          : form.dependents,
      NetMonthlyIncome:
        state.action === "update" ? parseFloat(NetMonthlyIncome) : form.income,
      IsActiveLiabilities: IsActiveLiabilities,
      TotalLiabilities:
        state.action === "update"
          ? parseFloat(TotalLiabilities)
          : form.liabilities1,
      MonthlySpend:
        state.action === "update" ? parseFloat(MonthlySpend) : form.spend,
      RepaymentType:
        state.action === "update" ? RepaymentType : form.RepaymentType,
    };

    const userToken = localStorage.getItem("awesomeLeadsToken");
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${userToken}`,
    };
    let url =
      state.action === "update"
        ? `${appConfig.baseURL}api/v1/predictions/?update=true&customer_id=${state.data.CustomerId}`
        : `${appConfig.baseURL}api/v1/predictions/?update=false&customer_id=-1`;
    axios
      .post(url, inputObj, { headers })
      .then((res) => {
        let createdscoreData = res.data;
        if (state.action === "update") {
          Alert.success("Credit score updated successfully");
        } else {
          Alert.success("Credit score created successfully");
        }
        navigate("/dashboard/generatenewcreditscore/riskreport", {
          state: {
            data: createdscoreData,
          },
        });
      })
      .catch((err) => {});
  };
  const logoutUser = () => {
    // localStorage.clear();
    navigate("/");
  };

  const handleBack = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <div style={{ backgroundColor: "#F4F4F4" }}>
        <div>
          <nav class="navbar navbar-expand-md bg-white">
            <div class="container-fluid">
              <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                <ul class="navbar-nav me-auto">
                  {/* <li class="nav-item active">
                                <a class="nav-link" href="#">Left</a>
                            </li> */}
                  <li class="nav-item active">
                    <img
                      class="nav-link"
                      src="/images/Logo@2x.png"
                      id="logo1"
                    />
                  </li>
                </ul>
              </div>
              {/* <div class="mx-auto order-0">
                        <a class="navbar-brand mx-auto" href="#">Navbar 2</a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".dual-collapse2">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    </div> */}
              <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                <ul class="navbar-nav ms-auto">
                  <li class="nav-item">
                    <a class="nav-link" href="/dashboard">
                      Dashboard
                    </a>
                  </li>
                  {/* <li class="nav-item">
                <a class="nav-link" href="#">
                  User
                </a>
              </li>{" "} */}
                  <li class="nav-item">
                    <a class="nav-link" href="/report">
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
                  <li class="nav-item" onClick={logoutUser}>
                    <LogoutIcon className="logout" />
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="form-div">
          {state.action == "update" ? (
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="container"
            >
              <div class="header">
                <h2>Update Credit Score</h2>

                <div className="top-btn">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    class="btn btn-primary btn-lg btn-block"
                  >
                    Update Credit Score
                  </button>
                </div>
              </div>

              <Row className="mt-3 mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Customer name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    disabled
                    placeholder="Enter your name"
                    name="customer"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    // isInvalid={!!errors.name}
                  />
                  {/* <Form.Control.Feedback type="invalid">{.name}</Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    disabled
                    type="email"
                    placeholder="Enter your Email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    isInvalid={!!errors.email}
                  />
                  {/* <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> */}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    required
                    disabled
                    type="text"
                    placeholder="Enter your Phone Number"
                    value={Mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    isInvalid={!!errors.number}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Enter your state"
                    value={State}
                    onChange={(e) => setState(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select State
                    </option>
                    {staticData.state.map((state) => {
                      return <option value={state}>{state}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your state"
                    value={State}
                    onChange={(e) => setState(e.target.value)}
                    isInvalid={!!errors.state}
                  ></Form.Control>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group> */}
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Enter your City"
                    value={City}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select City
                    </option>
                    {staticData.cities.map((city) => {
                      return <option value={city}>{city}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>House Ownership</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select"
                    value={HouseOwnership}
                    onChange={(e) => setHouseOwnership(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select House Ownership
                    </option>
                    {staticData.houseOwnershipType.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="15"
                    max="60"
                    placeholder="Enter your Age"
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                    isInvalid={!!errors.age}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Income</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter your Monthly Income"
                    value={NetMonthlyIncome}
                    onChange={(e) => setNetMonthlyIncome(e.target.value)}
                    isInvalid={!!errors.income}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Employment Type</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select"
                    value={EmploymentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select Employment type
                    </option>
                    {staticData.employementType.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Occupation</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select your Occupation"
                    value={Occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select Occupation type
                    </option>
                    {staticData.occupationType.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select Qualification"
                    value={Qualification}
                    onChange={(e) => setQualification(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select Qualification
                    </option>
                    {staticData.qualificationType.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Number of Dependents</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="0"
                    max="10"
                    placeholder="Enter Number of Dependents"
                    value={NumberOfDependants}
                    onChange={(e) => setNumberOfDependants(e.target.value)}
                    isInvalid={!!errors.dependents}
                  ></Form.Control>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Liabilities</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select"
                    value={IsActiveLiabilities}
                    onChange={(e) => setIsActiveLiabilities(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select
                    </option>
                    {staticData.liabilities.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Current EMI/Liabilities</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter your Liablities"
                    value={TotalLiabilities}
                    onChange={(e) => setTotalLiabilities(e.target.value)}
                    isInvalid={!!errors.liabilities1}
                  ></Form.Control>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Monthly Expenditure</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter your Monthly Expenditure"
                    value={MonthlySpend}
                    onChange={(e) => setMonthlySpend(e.target.value)}
                    isInvalid={!!errors.spend}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>No of Guarantors</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="0"
                    max="5"
                    placeholder="Enter number of Guarantors"
                    isInvalid={!!errors.guarantors}
                  />
                  {/* <Form.Control.Feedback type="inValid">Enter number of Guarantors between 0 to 5</Form.Control.Feedback> */}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Repayment Type</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select Repayment Type"
                    value={RepaymentType}
                    onChange={(e) => setRepaymentType(e.target.value)}
                  >
                    <option value="" selected disabled>
                      Please select Repayment Type
                    </option>
                    {staticData.repaymentType.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select Model"
                  >
                    <option value="" selected disabled>
                      Select Model
                    </option>
                    <option value="Logistic Regression">
                      Logistic Regression
                    </option>
                    <option value="Decision Tree">Decision Tree</option>
                    <option value=" Random Forest"> Random Forest</option>
                  </Form.Control> */}

                {/* <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group> */}
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <div className="act-btn">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      class="btn btn-primary btn-lg btn-block"
                    >
                      Update Credit Score
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      id="backBtn"
                      onClick={handleBack}
                      className="btn btn-outline-primary"
                    >
                      Back
                    </button>
                  </div>
                </Form.Group>
              </Row>

              {flag && (
                <Form.Control.Feedback type="invalid" className="error">
                  Please provide a valid state.
                </Form.Control.Feedback>
              )}
            </Form>
          ) : (
            <Form
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
              className="container"
            >
              <div class="header">
                <h2>Generate A New Credit Score</h2>

                <div className="top-btn">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    class="btn btn-primary btn-lg btn-block"
                  >
                    Generate A Credit Score
                  </button>
                </div>
              </div>
              <Row className="mt-3 mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Customer name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your name"
                    name="customer"
                    value={
                      state.action === "update" ? state.data.Name : form.name
                    }
                    // value={form.Name}
                    onChange={(e) => setField("name", e.target.value)}
                    isInvalid={!!errors.name}
                  />
                  {/* <Form.Control.Feedback type="invalid">{.name}</Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Enter your Email"
                    value={
                      state.action === "update" ? state.data.Email : form.email
                    }
                    // value={form.Email}
                    onChange={(e) => setField("email", e.target.value)}
                    isInvalid={!!errors.email}
                  />
                  {/* <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback> */}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your Phone Number"
                    value={
                      state.action === "update"
                        ? state.data.Mobile
                        : form.number
                    }
                    // value={form.Mobile}
                    onChange={(e) => setField("number", e.target.value)}
                    isInvalid={!!errors.number}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Enter your state"
                    value={
                      state.action === "update" ? state.data.State : form.state
                    }
                    // value={form.State}

                    onChange={(e) => setField("state", e.target.value)}
                  >
                    <option
                      value=""
                      selected
                      disabled
                      style={{ fontSize: "12px" }}
                    >
                      Please select State
                    </option>
                    {staticData.state.map((state) => {
                      return <option value={state}>{state}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    value={form.city}
                    // value={form.City}
                    onChange={(e) => setField("city", e.target.value)}
                  >
                    <option
                      value=""
                      selected
                      disabledstyle={{ fontSize: "12px" }}
                    >
                      Please select City
                    </option>
                    {staticData.cities.map((city) => {
                      return <option value={city}>{city}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>

                {/* <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your City"
                    value={
                      state.action === "update" ? state.data.City : form.city
                    }
                    // value={form.City}
                    onChange={(e) => setField("city", e.target.value)}
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group> */}
                {/* <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Enter your state"
                    value={
                      state.action === "update" ? state.data.State : form.state
                    }
                    // value={form.State}
                    onChange={(e) => setField("state", e.target.value)}
                    isInvalid={!!errors.state}
                  ></Form.Control>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group> */}
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>House Ownership</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select"
                    value={form.HouseOwnership}
                    onChange={(e) => setField("houseOwnership", e.target.value)}
                  >
                    <option
                      value=""
                      selected
                      disabledstyle={{ fontSize: "12px" }}
                    >
                      Please select House Ownership
                    </option>
                    {staticData.houseOwnershipType.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="15"
                    max="60"
                    placeholder="Enter your Age"
                    value={form.Age}
                    // value={state.action === "update" ? state.data.Age : form.age}
                    onChange={(e) => setField("age", e.target.value)}
                    isInvalid={!!errors.age}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Income</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter your Monthly Income"
                    // value={
                    //   state.action === "update"
                    //     ? state.data.NetMonthlyIncome
                    //     : form.income
                    // }
                    value={form.NetMonthlyIncome}
                    onChange={(e) => setField("income", e.target.value)}
                    isInvalid={!!errors.income}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Employment Type</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select"
                    // value={
                    //   state.action === "update"
                    //     ? state.data.EmploymentType
                    //     : form.employeeType
                    // }
                    value={form.EmploymentType}
                    onChange={(e) => setField("employeeType", e.target.value)}
                  >
                    <option
                      value=""
                      selected
                      disabledstyle={{ fontSize: "12px" }}
                    >
                      Please select Employment type
                    </option>
                    {staticData.employementType.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Occupation</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select your Occupation"
                    // value={
                    //   state.action === "update"
                    //     ? state.data.Occupation
                    //     : form.occupationType
                    // }
                    value={form.Occupation}
                    onChange={(e) => setField("occupationType", e.target.value)}
                  >
                    <option
                      value=""
                      selected
                      disabledstyle={{ fontSize: "12px" }}
                    >
                      Please select Occupation type
                    </option>
                    {staticData.occupationType.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Qualification</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select Qualification"
                    value={
                      state.action === "update"
                        ? state.data.Qualification
                        : form.qualificationType
                    }
                    // value={form.Qualification}
                    onChange={(e) =>
                      setField("qualificationType", e.target.value)
                    }
                  >
                    <option
                      value=""
                      selected
                      disabledstyle={{ fontSize: "12px" }}
                    >
                      Please select Qualification
                    </option>
                    {staticData.qualificationType.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Number of Dependents</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="0"
                    max="10"
                    placeholder="Enter Number of Dependents"
                    value={
                      state.action === "update"
                        ? state.data.NumberOfDependants
                        : form.dependents
                    }
                    // value={form.NumberOfDependants}
                    onChange={(e) => setField("dependents", e.target.value)}
                    isInvalid={!!errors.dependents}
                  ></Form.Control>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Liabilities</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select"
                    value={
                      state.action === "update"
                        ? state.data.TotalLiabilities
                        : form.liabilities
                    }
                    // value={form.IsActiveLiabilities}
                    onChange={(e) => setField("liabilities", e.target.value)}
                  >
                    <option
                      value=""
                      selected
                      disabledstyle={{ fontSize: "12px" }}
                    >
                      Please select
                    </option>
                    {staticData.liabilities.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Current EMI/Liabilities</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter your Liablities"
                    value={form.liabilities === "Yes" ? form.liabilities1 : 0}
                    // value={form.TotalLiabilities}
                    onChange={(e) => setField("liabilities1", e.target.value)}
                    isInvalid={!!errors.liabilities1}
                  ></Form.Control>
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Monthly Expenditure</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="Enter your Monthly Expenditure"
                    value={
                      state.action === "update"
                        ? state.data.MonthlySpend
                        : form.spend
                    }
                    // value={form.MonthlySpend}
                    onChange={(e) => setField("spend", e.target.value)}
                    isInvalid={!!errors.spend}
                  />
                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>No of Guarantors</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    min="0"
                    max="5"
                    placeholder="Enter number of Guarantors"
                    isInvalid={!!errors.guarantors}
                  />
                  {/* <Form.Control.Feedback type="inValid">Enter number of Guarantors between 0 to 5</Form.Control.Feedback> */}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Repayment Type</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select Repayment Type"
                    // value={form.RepaymentType}
                    value={
                      state.action === "update"
                        ? state.data.RepaymentType
                        : form.RepaymentType
                    }
                    onChange={(e) => setField("RepaymentType", e.target.value)}
                  >
                    <option
                      value=""
                      selected
                      disabledstyle={{ fontSize: "12px" }}
                    >
                      Select Repayment Type
                    </option>

                    {staticData.repaymentType.map((employee) => {
                      return <option value={employee}>{employee}</option>;
                    })}
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    type="select"
                    placeholder="Please select Model"
                  >
                    <option value="" selected disabled>
                      Select Model
                    </option>
                    <option value="Logistic Regression">
                      Logistic Regression
                    </option>
                    <option value="Decision Tree">Decision Tree</option>
                    <option value=" Random Forest"> Random Forest</option>
                  </Form.Control>

                  <Form.Control.Feedback></Form.Control.Feedback>
                </Form.Group> */}
                <Form.Group as={Col} md="6" controlId="validationCustom02">
                  <div className="act-btn">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      class="btn btn-primary btn-lg btn-block"
                    >
                      Generate A Credit Score
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      id="backBtn"
                      onClick={handleBack}
                      className="btn btn-outline-primary"
                    >
                      Back
                    </button>
                  </div>
                </Form.Group>
              </Row>

              {flag && (
                <Form.Control.Feedback type="invalid" className="error">
                  Please provide a valid state.
                </Form.Control.Feedback>
              )}
            </Form>
          )}
        </div>
      </div>
    </>
  );
}

export default GenerateNewCreditScore;

{
  /* <form>
                    <h2>Generate A New Credit Score</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply text dummy of the printing and typesetting industry</p>
                    <div class="form-group row pt-5 pr-3">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Customer Name</label>
                            <input type="text" value={form.name} onInvalid={!!errors.name}
                            onChange={(e) => setField('name',e.target.value)} class="form-control" id="inputEmail4" placeholder="Enter your Name" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Customer Email</label>
                            <input type="email" class="form-control" id="inputEmail4" placeholder="Email" />
                        </div>
                    </div>

                    <div class="form-group row pt-3 pr-3">
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Customer Phone Number</label>
                            <input type="number" class="form-control" id="inputPassword4" placeholder="Enter Phone Number" />
                        </div>

                        <div class="form-group col-md-6">
                            <label for="inputPassword4">City</label>
                            <input type="text" class="form-control" id="inputPassword4" placeholder="Enter your City" />
                        </div>
                    </div>

                    <div class="form-group row pt-3 pr-3">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">State</label>
                            <input type="text" class="form-control" id="inputEmail4" placeholder="Enter your state" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">House Ownership</label>
                            <select class="form-control" id="sel1" placeholder='Select your Income'>
                                <option value="" selected disabled>Please select House Ownership</option>
                                <option value="">Own house</option>
                                <option value="">Rented/Others</option>
                                <option value="">Company Provided</option>
                                <option value="">Parental House</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row pt-3 pr-3">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Age</label>
                            <input type="number" name="Number" min="15" max="60" class="form-control" id="inputEmail4" placeholder="Enter your Age" />
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Net Monthly Income</label>
                            <input type="number" class="form-control" id="inputPassword4" placeholder="Enter Monthly income" />
                        </div>
                    </div>

                    <div class="form-group row pt-3 pr-3">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Employment Type</label>
                            <select class="form-control" id="sel1" placeholder='Select your Income'>
                                <option value="" selected disabled>Please select Emplyment type</option>
                                <option value="">Fulltime/Regular/Probationary</option>
                                <option value="">Contractual/Part time</option>
                                <option value="">Others</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Occupation</label>
                            <select class="form-control" id="sel1" placeholder='Select your Income'>
                                <option value="" selected disabled>Please select Emplyment type</option>
                                <option value="">Others</option>
                                <option value="">Business in Trade sector</option>
                                <option value="">State Govt Services  </option>
                                <option value="">Services In Public Sector Undertaking </option>
                                <option value="">Services In Private Establishment </option>
                                <option value="">Retired </option>
                                <option value="">Business In Service sector </option>
                                <option value="">Legal Profession </option>
                                <option value="">Other Professionals </option>
                                <option value="">Services In Defense Establishment </option>
                                <option value="">Housewives </option>
                                <option value="">CA/ICWA/Taxation/Finance </option>
                                <option value="">Medical Profession </option>
                                <option value="">Central Govt Services </option>
                                <option value="">Artist/Writer Etc </option>
                                <option value="">Engineering/Architect/Technical/Consultant </option>
                                <option value="">Industrialist </option>
                                <option value="">Artisan/Craftsman </option>
                                <option value="">Migrant Laborers </option>
                                <option value="">Students </option>
                                <option value="">Share and Stock Broker </option>
                                <option value="">Journalists</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row pt-3 pr-3">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Qualification</label>
                            <select class="form-control" id="sel1" placeholder='Select your Income'>
                                <option value="" selected disabled>Please select Emplyment type</option>
                                <option value="">DEGREE </option>
                                <option value=""> HSC </option>
                                <option value="">POST-GRADUATE </option>
                                <option value="">DIPLOMA </option>
                                <option value="">DOCTORATE </option>

                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Number of dependents</label>
                            <input type="number" name="Number" min="0" max="10" class="form-control" id="inputPassword4" placeholder="Please enter Number of Dependents" />
                        </div>
                    </div>

                    <div class="form-group row pt-3 pr-3">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Current EMI/Liabilities</label>
                            <select class="form-control" id="sel1" placeholder='Select your Income'>
                                <option value="" selected disabled>Please select</option>
                                <option value="">Yes </option>
                                <option value="">No</option>
                            </select>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputPassword4">Current EMI/Liabilities</label>
                            <input type="number" class="form-control" id="inputPassword4" placeholder="If Yes" />
                        </div>
                    </div>

                    <div class="form-group row pt-3 pr-3">
                        <div class="form-group col-md-6">
                            <label for="inputEmail4">Monthly Spend</label>
                            <input type="number" class="form-control" id="inputEmail4" placeholder="Please enter Monthly Spend" />
                        </div>
                    </div>

                    <div className='act-btn'>
                        <button type="button" id="filter-btn" class="btn btn-outline-primary">Apply filter</button>
                        <button type="submit" class="btn btn-primary btn-lg btn-block">Generate a New Credit Score</button>
                    </div>
                </form> */
}
