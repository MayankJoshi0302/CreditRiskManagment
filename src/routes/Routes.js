import CreatePassword from "../components/createPassword/CreatePassword";
import Dashboard from "../components/dashboard/Dashboard";
import Login from "../components/login/Login";
import Report from "../components/report/Report";
import GenerateNewCreditScore from "../components/createCreditScore/GenerateNewCreditScore";
import RiskReport from "../components/riskReport/RiskReport";
import RiskReportdb from "../components/riskReport/RiskReportdb";

const pageList = [
  {
    component: Login,
    path: "/login",
    name: "Login",
  },
  {
    component: CreatePassword,
    path: "/createpassword",
    name: "Create Password",
  },
  {
    component: Dashboard,
    path: "/dashboard",
    name: "Dashboard",
  },
  {
    component: GenerateNewCreditScore,
    path: "/dashboard/generatenewcreditscore",
    name: "Purcahse",
  },
  {
    component: RiskReport,
    path: "/dashboard/generatenewcreditscore/riskreport",
    name: "Setting",
  },
  {
    component: Report,
    path: "/report",
    name: "Setting",
  },
  {
    component: RiskReportdb,
    path: "/dashboard/generatenewcreditscore/riskreportdb",
    name: "Setting",
  },
];
export default pageList;
