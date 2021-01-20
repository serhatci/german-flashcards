import "./header-footer.css";
import { SettingsIcon } from "../icons/Icons.jsx";

const Footer = () => {
  return (
    <div
      className="flex-horizontal header-footer-container"
      id="footer-container"
    >
      <div id="settings-button">
        <SettingsIcon />
      </div>
      <div id="year">
        <h5>@2020</h5>
      </div>
    </div>
  );
};

export default Footer;
