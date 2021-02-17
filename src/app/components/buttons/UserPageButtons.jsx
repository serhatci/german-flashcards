import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./buttons.css";

export const LogoutButton = (props) => {
  const { logout } = useAuth();

  function logoutClicked() {
    logout().then(
      () => {
        props.setConnErr("");
        localStorage.clear();
        props.success("You have been successfully logged out!");
      },
      (error) => {
        props.setConnErr(error.message);
        props.success("");
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
    props.setConnErr("");
    deleteUser(currentUser).catch((error) => {
      props.setConnErr(error.message);
      props.success("");
    });

    if (props.connErr !== "") return;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ id: currentUser.uid }),
    };

    fetch("http://127.0.0.1:5000/api/delete-user", options).then(() => {
      localStorage.clear();
      props.success("Account has been successfully deleted!");
    });
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
