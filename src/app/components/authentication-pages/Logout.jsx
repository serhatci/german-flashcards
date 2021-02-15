import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./authentication.css";
import { useAuth } from "../../contexts/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const [connError, setConnError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!success) return

    var timer = setTimeout(() => {
      history.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [success, history])

  function logoutClicked() {
    logout().then(
      () => {
        setConnError("");
        localStorage.clear()
        setSuccess(true)
      },
      (error) => {
        let errorMessage = error.message;
        setConnError(errorMessage);
        setSuccess(false)
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

  function successMessage() {
    return <p className="success-message">You have successfully logged out!</p>;
  }

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      {success ? successMessage() : logoutPage()}
    </div>
  );
};

export default Logout;
