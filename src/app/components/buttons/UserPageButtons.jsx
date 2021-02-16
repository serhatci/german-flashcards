import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./buttons.css";

export const LogoutButton = (props) => {
  const { logout } = useAuth();

  function logoutClicked() {
    logout().then(
      () => {
        props.err("");
        localStorage.clear();
        props.msg("You have been successfully logged out!");
      },
      (error) => {
        props.err(error.message);
        props.msg("");
      }
    );
  }

  return (
    <button
      type="button"
      className="auth-button but-userpage"
      id="logout"
      onClick={logoutClicked}>
      Logout
    </button>
  );
};

export const UpdatePasswordButton = () => {
  return (
    <button className="auth-button but-userpage" id="update-pass">
      Update Password
    </button>
  );
};

export const DeleteAccountButton = (props) => {
  const { deleteUser, currentUser } = useAuth();
  const [question, setQuestion] = useState(false);

  function deleteAccount() {
    deleteUser(currentUser).then(
      () => {
        props.err("");
        localStorage.clear();
        props.msg("Account has been successfully deleted!");
      },
      (error) => {
        props.err(error.message);
        props.msg("");
      }
    );
  }

  return (
    <>
      {question ? (
        <QuestionView question={setQuestion} delete={deleteAccount} />
      ) : (
        <DeleteView question={setQuestion} />
      )}
    </>
  );
};

const DeleteView = (props) => {
  return (
    <button
      type="button"
      className="auth-button but-userpage"
      id="delete-button"
      onClick={() => props.question(true)}>
      Delete Account
    </button>
  );
};

const QuestionView = (props) => {
  return (
    <>
      <button
        className="fade-in question-buttons but-delete"
        onClick={() => props.delete()}>
        DELETE
      </button>
      <button
        className="fade-in question-buttons"
        onClick={() => props.question(false)}>
        CANCEL
      </button>
    </>
  );
};
