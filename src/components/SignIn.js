import React from "react";
import "./Login.css";
// import {Logo} from "../../public/images/Logo@2x.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "./Data.js.js";
import { appConfig } from "../Config";

function Login() {
  const [token, setToken] = useState(localStorage.getItem("awesomeLeadsToken"));

  const [isLogin, setLogin] = useState(false);

  const submitLogin = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",

        accept: "application/json",
      },

      body: JSON.stringify(
        `grant_type=&username=anupriya.jaiswal&password=j3gDA6n6D9vz3q&scope=&client_id=&client_secret=`
      ),
    };

    const response = await fetch(`${appConfig.baseURL}token/`, requestOptions);
    const data = await response.json();

    // if (!response.ok) {
    //     setToken(null);
    // } else {
    //     // Here we got all data related to login like token / customerID.
    //     // accessToken: string = null
    //     // isLogin: boolean = false
    //     // accessionTimeOut: string = '15' // in Minutes
    //     // isAccess - Ture  (If true so redirect to dashbaord page)/ False (Open login page)
    //     // If is false --> try to login --get 200 | 400 (Show message --->> If you got message from api OR Need to set static messgae)
    //     // 200 - first set all keys ( isLogin = true | accessToken = "AHKSJHAKSH") -->> Redirect to dashboard

    //      setToken(data.access_token);

    //      if(token !== null){

    //      }

    //     setToken(data.access_token);
    //     localStorage.setItem("awesomeLeadsToken", token);
    //     navigate("/dashboard")

    // }
  };

  const [password, setPassword] = useState("password");

  const [inputtext, setInputtext] = useState({
    email: "",
    password: "",
  });

  const [eye, setEye] = useState(false);
  const [type, settype] = useState(false);

  const Eye = () => {
    if (password === "password") {
      setPassword("text");
      setEye(false);
      settype(true);
    } else {
      setPassword("password");
      setEye(true);
      settype(false);
    }
  };

  const inputEvent = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputtext((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      };
    });
  };

  let navigate = useNavigate();

  function onClickHandler(event) {
    event.preventDefault();

    // let mapMail = JSON.parse(window.localStorage.getItem('DataArr')).map((item) => (item.email))
    //   // let passwordMap =  JSON.parse(window.localStorage.getItem('DataArr')).map((item) => item.password);

    //   const mailEle = mapMail.find((ele) => {
    //     return ele === inputtext.email
    // })

    // const passwordEle = passwordMap.find((ele)=> {
    //     return inputtext.password === ele
    // })

    if (!inputtext.email || !inputtext.password) {
      setFlag(true);
      setErrorMsg("Please fill all details");
    } else {
      submitLogin();
    }
    //   (mailEle === inputtext.email && passwordEle === inputtext.password){
    //     setFlag(false);
    //     setErrorMsg("success")

    //     // var allInputs =  JSON.parse(window.localStorage.getItem('allInputs') || '[]')
    //     // allInputs.unshift(inputtext)

    //     localStorage.setItem("inputtext", JSON.stringify(inputtext));
    //     navigate('/dashboard')
    // }

    // else {
    //   setFlag(true)
    //   setErrorMsg("Email and password do not match")
    // }
  }

  // const [login, setLogin] = useState(true);
  const [flag, setFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  // const [success, setSucess] = useState(false);
  // const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8" id="container-left">
            <div className="logo">
              <img src="/images/Logo@2x.png" id="logo" />
            </div>
            <div className="heading">
              <h2 style={{ marginLeft: "0px" }}>
                Innovative and smarter tool for{" "}
              </h2>
              <span id="span">Credit Risk Management</span>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam erat, sed diam voluptua. At vero eos et accusam et
                justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus est .
              </p>
              <h3>Get Enrolled with us Today</h3>

              <button id="left-btn">
                <span id="btn-text">Send an inquiry</span>
                <span>
                  <img
                    id="arrow"
                    src="/images/arrow_circle_right_black_24dp@2x.png"
                  />
                </span>
              </button>
            </div>
            <img id="img" src="/images/Img@2x.png"></img>
          </div>

          {/*sign up */}
          <div className="col-lg-4" id="container-right">
            <form onSubmit={onClickHandler} className="main">
              <div>
                <h3 id="heading1">Sign In to Your Account</h3>
              </div>

              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  name="email"
                  onChange={inputEvent}
                  placeholder="Email"
                  value={inputtext.email}
                />
                <label id="label-email" for="floatingInput">
                  Email address
                </label>
              </div>

              <div className="form-floating" id="passpord-form-floating">
                <img
                  id="lock-img"
                  src="images/lock_black_24dp@2x.png"
                  alt="lock-img"
                />
                <input
                  type={password}
                  className="form-control"
                  id="floatingPassword"
                  name="password"
                  value={inputtext.password}
                  placeholder="Password"
                  onChange={inputEvent}
                />
                <label id="label-password" for="floatingPassword">
                  Password
                </label>
                <i
                  onClick={Eye}
                  className={`fa ${eye ? "fa-eye" : "fa-eye-slash"}`}
                  id="eye"
                ></i>

                {/* <img onClick ={Eye}src='images/visibility_black_24dp@2x.png' id="eye" alt="lock-img"/> */}
              </div>
              <div className="mb-3 form-check">
                <a id="link" href="/">
                  Forgot Password ?{" "}
                </a>
              </div>
              <div className="d-grid gap-2">
                <button
                  type="submit"
                  id="loginbtn"
                  onSubmit={onClickHandler}
                  className="btn btn-primary btn-lg btn-block"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
