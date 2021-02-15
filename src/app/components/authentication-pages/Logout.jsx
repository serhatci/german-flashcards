import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./authentication.css";
import { useAuth } from "../../contexts/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const [connError, setConnError] = useState("");
  const history = useHistory();

  function logoutClicked() {
    logout().then(
      () => {
        setConnError("");
        localStorage.clear()
        history.push("/");
      },
      (error) => {
        let errorMessage = error.message;
        setConnError(errorMessage);
      }
    );
  }

  function logoutPage() {
    return (
      <>
        <button
          type="button"
          className="auth-button but-logout"
          id="logout"
          onClick={logoutClicked}
        >
          Logout
        </button>
        <Link to="/update-profile">
          <div className="auth-button but-logout" id="Update Profile">
            Update Profile
          </div>
        </Link>
      </>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      {logoutPage()}
    </div>
  );
};

export default Logout;
