import { toast } from "react-toastify";
import "./Alert.css";

const Alert = {
  options: {
    theme: "light",
    autoclose: 5000,
    hideProgressBar: false,
    closeOnclick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  },
  success(msg, options = {}) {
    return toast.success(msg, {
      ...Alert.options,
      className: "toast-success-container toast-success-container-after",
    });
  },
  error(msg, options = {}) {
    return toast.error(msg, {
      ...Alert.options,
      className: "toast-error-container toast-error-container-after",
    });
  },
};
// warn (msg, options = {}) {
// return toast.warn(msg, {
// ...PtsAlert.options, className;
// "toast-warn-container toast-warn-container-after",
export default Alert;
