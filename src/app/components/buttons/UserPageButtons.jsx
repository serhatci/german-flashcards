import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import "./buttons.css"

export const DeleteAccountButton = (props) => {
    const { deleteUser, currentUser } = useAuth();
    const [question, setQuestion] = useState(false)

    function deleteAccount() {
        deleteUser(currentUser).then(
            () => {
                props.err("");
                localStorage.clear()
                props.msg("Account has been successfully deleted!")
            },
            (error) => {
                props.err(error.message);
                props.msg("")
            }
        );
    }

    function questionView() {
        return (<>
            <button
                className="fade-in question-buttons but-delete"
                onClick={deleteAccount}>DELETE
            </button>
            <button
                className="fade-in question-buttons"
                onClick={() => setQuestion(false)}>CANCEL
            </button>
        </>)
    }

    function deleteView() {
        return (
            <button
                type="button"
                className="auth-button but-userpage"
                id="delete-button"
                onClick={() => setQuestion(true)}
            >
                Delete Account
            </button>)
    }

    return (<>{question ? questionView() : deleteView()}</>)
}


export const LogoutButton = (props) => {
    const { logout } = useAuth();

    function logoutClicked() {
        logout().then(
            () => {
                props.err("");
                localStorage.clear()
                props.msg("You have been successfully logged out!")
            },
            (error) => {
                props.err(error.message);
                props.msg("")
            }
        );
    }

    return (
        <button
            type="button"
            className="auth-button but-userpage"
            id="logout"
            onClick={logoutClicked}
        >
            Logout
        </button>
    )
}

export const UpdatePasswordButton = () => {
    return (<button className="auth-button but-userpage" id="update-pass">
        Update Password
    </button>)
}