// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";

// // import ErrorMessage from "./ErrorMessage";
// import { UserContext } from "./Auth/UserContext";

// export default function LoginJWT() {
//     const navigate = useNavigate()

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [errorMessage, setErrorMessage] = useState("");
//     const [token, setToken] = useContext(UserContext);

//     const submitLogin = async () => {
//         const requestOptions = {
//             method: "POST",
//             headers: { "Content-Type": "application/x-www-form-urlencoded" ,
//             // 'Access-Control-Allow-Headers': 'Content-Type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Methods',
//             // 'Access-Control-Allow-Origin' : '*',
//             // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//             'accept': 'application/json'

//         },

//         body: JSON.stringify(
//                 `grant_type=&username=anupriya.jaiswal&password=j3gDA6n6D9vz3q&scope=&client_id=&client_secret=`
//              ),
//         };

//         const response = await fetch('http://65.0.55.164/token/', requestOptions);
//         const data = await response.json();

//         if (!response.ok) {
//             setToken(null);
//         } else {
//             // Here we got all data related to login like token / customerID.
//             // accessToken: string = null
//             // isLogin: boolean = false
//             // accessionTimeOut: string = '15' // in Minutes
//             // isAccess - Ture  (If true so redirect to dashbaord page)/ False (Open login page)
//             // If is false --> try to login --get 200 | 400 (Show message --->> If you got message from api OR Need to set static messgae)
//             // 200 - first set all keys ( isLogin = true | accessToken = "AHKSJHAKSH") -->> Redirect to dashboard
//             setToken(data.access_token);
//             localStorage.setItem("awesomeLeadsToken", token);
//             navigate("/dashboard")
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         submitLogin();
//     };
//     return (
//         <div className="column">
//             <form className="box" onSubmit={handleSubmit}>
//                 <h1 className="title has-text-centered">Login</h1>
//                 <div className="field">
//                     <label className="label">Email Address</label>
//                     <div className="control">
//                         <input
//                             type="text"
//                             placeholder="Enter email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="input"
//                             required
//                         />
//                     </div>
//                 </div>
//                 <div className="field">
//                     <label className="label">Password</label>
//                     <div className="control">
//                         <input
//                             type="password"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="input"
//                             required
//                         />
//                     </div>
//                 </div>
//                 {/* <ErrorMessage message={errorMessage} /> */}
//                 <br />
//                 <button className="button is-primary" type="submit">
//                     Login
//                 </button>
//             </form>
//         </div>
//     );
// };
