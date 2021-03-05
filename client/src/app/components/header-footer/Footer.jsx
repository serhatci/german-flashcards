import "./header-footer.css";
import { SettingsIcon } from "../icons/Icons.jsx";

const Footer = () => {
  return (
    <div
      className="flex-horizontal header-footer-container"
      id="footer-container"
    >
      <SettingsIcon />
      <strong id="year">@2020</strong>
    </div>
  );
};

export default Footer;
