import {
  BrowserRouter,
  // Switch,
  Route,
  // Link,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./components/login/Login";
import pageList from "./routes/Routes";
function App(props) {
  return (
    <div className="App">
      <ToastContainer
        style={{
          alignItems: "center",
          fontsize: "small",
          width: "auto",
          maxwidth: "20rem",
          maxHeight: "lem",
          wordBreak: "break-word",
        }}
        position="top-right"
        autoclose={5000}
        newestOnTop={false}
        closeOnclick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        {/* <Navbar></Navbar> */}

        <div className="main_section">
          <Routes>
            {/* <Route exact path="/" element={<LoginLayout></LoginLayout>} > */}
            {/* <Route path="/" element={<LoginLayout></LoginLayout>}>
              <Route path="/login" element={<Login></Login>} />
            </Route>
            <Route path="/" element={<AppLayout></AppLayout>}>
              <Route path="/dashboard" element={<Dashboard></Dashboard>} />
              <Route exact path="/" element={<Login></Login>} />
              <Route exact path="/" element={<Login></Login>} />
              <Route exact path="/" element={<Login></Login>} />
            </Route> */}
            {pageList.map((page, index) => {
              return (
                <Route
                  key={index}
                  path={page.path}
                  element={<page.component />}
                />
              );
            })}
            <Route exact path="/" element={<Login></Login>} />
          </Routes>
        </div>
      </BrowserRouter>
      {/* <header className="App-header">
        
      <BrowserRouter>
        <Routes>
        <Route path="/" element={""}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/createpassword" element={<CreatePassword/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/dashboard/generatenewcreditscore" element={<GenerateNewCreditScore/>}/>
        <Route path="/dashboard/generatenewcreditscore/riskreport" element={<RiskReport/>}/>
       </Routes>
       </BrowserRouter>
      </header> */}
    </div>
  );
}

export default App;
