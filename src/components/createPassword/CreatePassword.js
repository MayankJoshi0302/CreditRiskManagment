import React from "react";
import "./CreatePassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePassword() {
  const [successMsg, setsuccessMsg] = useState(false);
  const [flag, setFlag] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [error, setError] = useState(false);
  // const [passwordErrorMsg, setPasswordErrorMsg] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [eye1, setEye1] = useState(false);
  const [eye, setEye] = useState(false);
  const [type, settype] = useState(false);

  function onSubmitHandler(e) {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError(true);
      setFlag(true);
      setErrorMsg("Error");
    } else if (password === confirmPassword) {
      // let passwordMap =  JSON.parse(window.localStorage.getItem('DataArr')).map((item) => item.password);

      // const passwordEle = passwordMap.find((ele)=> {
      //     return password === ele
      // })
      setError(false);
      localStorage.setItem("ChangedPassword", JSON.stringify(password));
      setsuccessMsg("Password Changed Successfully");
      setPassword("");
      setErrorMsg(false);
    }
  }

  let navigate = useNavigate();

  function onClikLink() {
    navigate("/dashboard");
  }

  const Eye = () => {
    if (password === "password") {
      setPassword("text");
      setEye(false);
      settype(false);
    } else {
      setPassword("password");
      setEye(true);
      settype(false);
    }
  };

  const Eye1 = () => {
    if (confirmPassword === "password") {
      setConfirmPassword("text");
      setEye1(false);
      settype(true);
    } else {
      setConfirmPassword("password");
      setEye1(true);
      settype(false);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8" id="container-left">
            <div className="logo">
              <img src="/images/Logo@2x.png" id="logo" />
            </div>
            <div className="heading">
              <h2>
                Keep Your Account <span id="span">Secured</span>
              </h2>
              {/* <p>
                Before we take you to your action dashboard, it is recommended
                that you keep your account secured by replacing your
                pre-generated password to a strong and easy to recall password.
                Use 8-32 characters in a combination of atleast one upper-case
                alphabet (A-Z), one lower case alphabet (a-z) and a special
                character (such as @,#,$,-).
              </p>
              <h3>Have a query/facing any issue</h3> */}

              {/* <button id="left-btn">
                <span id="btn-text">Contact Support</span>
                <span>
                  <img
                    id="arrow"
                    src="/images/arrow_circle_right_black_24dp@2x.png"
                  />
                </span>
              </button> */}
            </div>
            <img
              id="img"
              src="/images/img password@2x.png"
              style={{
                width: "350px",
                top: "263px",
                left: "533px",
                height: "362px",
              }}
            ></img>
          </div>

          {/*sign up */}
          <div className="col-lg-4" id="container-right">
            <form
              className="main"
              style={{ height: "321px" }}
              onSubmit={onSubmitHandler}
            >
              <div>
                <h3 id="heading1">Create New Password</h3>
              </div>

              <div className="form-floating" id="passpord-form-floating">
                <img
                  id="lock-img"
                  src="images/lock_black_24dp@2x.png"
                  alt="lock-img"
                />

                {error ? (
                  <input
                    type={password}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="New Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    style={{ border: "1px solid red" }}
                    name="password"
                  />
                ) : (
                  <input
                    type={password}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="New Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    name="password"
                  />
                )}

                <label id="label-password" for="floatingPassword">
                  New Password
                </label>

                <img
                  onClick={Eye}
                  src={`${
                    eye
                      ? "/images/outline_visibility_off_black_24dp.png"
                      : "/images/visibility_black_24dp@2x.png"
                  }`}
                  id="eye-2"
                />
              </div>

              {errorMsg && (
                <p id="error-msg">
                  <span>
                    <img src="/images/outline_error_outline_black_24dp.png" />
                  </span>
                  {errorMsg}
                </p>
              )}
              <div className="form-floating" id="passpord-form-floating">
                <img
                  id="lock-img"
                  src="images/lock_black_24dp@2x.png"
                  alt="lock-img"
                />

                {error ? (
                  <input
                    type={confirmPassword}
                    className="form-control"
                    id="floatingPassword1"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    style={{ border: "1px solid red" }}
                    name="confirmPassword"
                  />
                ) : (
                  <input
                    type={confirmPassword}
                    className="form-control"
                    id="floatingPassword1"
                    placeholder="Confirm Password"
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    name="confirmPassword"
                  />
                )}

                <label id="label-password" for="floatingPassword">
                  {" "}
                  Confirm Password
                </label>

                <img
                  onClick={Eye1}
                  src={`${
                    eye1
                      ? "/images/outline_visibility_off_black_24dp.png"
                      : "/images/visibility_black_24dp@2x.png"
                  }`}
                  id="eye"
                />
              </div>

              <div className="d-grid gap-2">
                <button
                  type="submit"
                  id="loginbtn"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Submit
                </button>
              </div>

              <a
                onClick={onClikLink}
                id="skip"
                href=""
                style={{ float: "left" }}
              >
                Skip and Proceed
              </a>
              <a id="skip" href="/login" style={{ float: "right" }}>
                Login
              </a>
              {successMsg && <p>{successMsg}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
