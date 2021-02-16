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
      <>
        <LogoutButton err={setConnError} msg={setSuccessMessage} />
        <Link to="/update-password">
          <UpdatePasswordButton />
        </Link>
        <DeleteAccountButton err={setConnError} msg={setSuccessMessage} />
      </>
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
