import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./buttons.css";

export const LogoutButton = (props) => {
  const { logout } = useAuth();

  async function logoutClicked() {
    await logout().then(
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

  async function deleteAccount() {
    props.setConnErr("");
    await deleteUserFromDB()
      .then(() => {
        deleteUser(currentUser);
      })
      .then(() => {
        props.success("Your account has been successfully deleted!");
      })
      .catch((error) => {
        props.setConnErr(error.message);
        props.success("");
      });
  }

  async function deleteUserFromDB() {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({ userID: currentUser.uid }),
    };

    await fetch("http://127.0.0.1:5000/api/delete-user", options).then(
      (res) => {
        if (!res.ok) throw new Error(res.message);
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
