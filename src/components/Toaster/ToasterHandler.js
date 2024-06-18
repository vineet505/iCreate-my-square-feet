import { toast } from "react-toastify";

const ThemeConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme:"dark"
};

const toastHandler = (message) => toast(message, ThemeConfig);

export { toastHandler };
