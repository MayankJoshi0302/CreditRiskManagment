// import React, { createContext, useEffect, useState , useContext } from "react";

// export const AuthContext = createContext(null);

// export const AuthProvider = ({children}) => {
//     const [token , setToken] = useState(null)
//       return(
//     <AuthContext.Provider value = {{token ,setToken}}>
//           {children}
//         </AuthContext.Provider>
//       )
// }

// export const useAuth = () => useContext(AuthContext)

// // export const UserProvider = (props) => {
// //     const [token, setToken] = useState(localStorage.getItem("awesomeLeadsToken"));

// //     useEffect(() => {
// //         const fetchUser = async () => {

// //             const requestOptions = {
// //                 method: "POST",

// //                     headers: { "Content-Type": "application/x-www-form-urlencoded" ,
// //         // 'Access-Control-Allow-Headers': 'Content-Type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Methods',
// //         // 'Access-Control-Allow-Origin' : '*',
// //         // 'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
// //         'accept': 'application/json',
// //                     Authorization: "Bearer " + token,
// //                 }
// //             };

// //             const response = await fetch('http://65.0.55.164/token/'  , requestOptions);

// //             if (!response.ok) {
// //                 setToken(null);
// //             }
// //             localStorage.setItem("awesomeLeadsToken", token);
// //         };
// //         fetchUser();
// //     }, [token]);

// //     return (
// //         <UserContext.Provider value={[token, setToken]}>
// //             {props.children}
// //         </UserContext.Provider>
// //     );
// // };
