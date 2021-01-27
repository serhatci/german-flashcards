import { useState } from "react";
import { Formik, Form } from "formik";
import { resetPasswordValSchema } from "../form-components/Validation";
import { Link, useHistory } from "react-router-dom";
import Input from "../form-components/Input";
import "./authentication.css";
import SubmitButton from "../form-components/SubmitButton";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [connError, setConnError] = useState("");
  const [success, setSuccess] = useState(false);

  function forgotPassForm() {
    return (
      <>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={resetPasswordValSchema}
          onSubmit={(values, { setSubmitting }) => {
            resetPassword(values.email).then(
              () => {
                setSuccess(true);
                setConnError("");
              },
              (error) => {
                let errorMessage = error.message;
                setConnError(errorMessage);
                setSuccess(false);
              }
            );
            setSubmitting(false);
          }}
        >
          <Form id="reset-password">
            <Input label="Email:" name="email" type="email" key="email" />
            <SubmitButton />
          </Form>
        </Formik>
        <div className="links-container">
          Do you need to{" "}
          <Link to="/signup">
            <strong>Sign Up?</strong>
          </Link>
          <br></br>
          or want to{" "}
          <Link to="/login">
            <strong>Log In?</strong>
          </Link>
        </div>
      </>
    );
  }

  function successMessage() {
    return (
      <>
        <p className="success-message">
          Your new password has been sent to your email address
        </p>
        <p>
          <Link to="/login">Log In?</Link>
        </p>
      </>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      {success ? successMessage() : forgotPassForm()}
    </div>
  );
};

export default ForgotPassword;
