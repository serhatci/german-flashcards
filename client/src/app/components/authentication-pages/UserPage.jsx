import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import {
  LogoutButton,
  DeleteAccountButton,
  UpdatePasswordButton,
} from "../buttons/UserPageButtons";
import "./authentication.css";

const UserPage = () => {
  const [connError, setConnError] = useState("");
  const [successMessage, setSuccessMessage] = useState();
  const history = useHistory();

  useEffect(() => {
    if (!successMessage) return;

    var timer = setTimeout(() => {
      history.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [successMessage, history]);

  function userPageView() {
    return (
      <div className="fade-in" id="userpage-container">
        <LogoutButton setConnErr={setConnError} success={setSuccessMessage} />
        <Link to="auth/update-password">
          <UpdatePasswordButton />
        </Link>
        <DeleteAccountButton
          setConnErr={setConnError}
          connErr={connError}
          success={setSuccessMessage}
        />
      </div>
    );
  }

  function message() {
    return <p className="success-message">{successMessage}</p>;
  }

  return (
    <div className="auth-container auth-center">
      <div className="auth-error">{connError}</div>
      {successMessage ? message() : userPageView()}
    </div>
  );
};

export default UserPage;
