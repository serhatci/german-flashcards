import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { UpdatePassValSchema } from "../form-components/Validation";
import { Link, useHistory } from "react-router-dom";
import Input from "../form-components/Input";
import "./authentication.css";
import SubmitButton from "../form-components/SubmitButton";
import { useAuth } from "../../contexts/AuthContext";

const UpdatePassword = () => {
  const { currentUser, updatePassword } = useAuth();
  const [connError, setConnError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      history.push("/");
    }, 2000);
    return () => clearTimeout(timer);

  }, [success, history]);

  function profileUpdateForm() {
    return (
      <>
        <Formik
          initialValues={{
            password: "",
            passConfirm: "",
          }}
          validationSchema={UpdatePassValSchema}
          onSubmit={(values, { setSubmitting }) => {
            setConnError("")
            updatePassword(values.password)
              .then(() => setSuccess(true))
              .catch((err) => {
                setConnError(err.message);
                setSuccess(false)
              })

            setSubmitting(false);
          }}
        >
          <Form id="updatePassword">
            <Input label="New Password:" name="password" type="password" />
            <Input label="Confirm Password:" name="passConfirm" type="password" />
            <SubmitButton />
          </Form>
        </Formik>
        <div className="links-container">
          <Link to="/user-page">
            <strong>GO BACK</strong>
          </Link>
        </div>
      </>
    );
  }

  function successMessage() {
    return <p className="success-message">You have successfully updated your password!</p>;
  }

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      <div className="update-profile-user">{currentUser.email}</div>
      {success ? successMessage() : profileUpdateForm()}
    </div>
  );
};

export default UpdatePassword;
