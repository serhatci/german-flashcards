import { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";

import { resetPasswordValSchema } from "../form-components/Validation";
import Input from "../form-components/Input";
import SubmitButton from "../form-components/SubmitButton";
import { useAuth } from "../../contexts/AuthContext";
import "./authentication.css";

const ForgotPassword = () => {
  const [connError, setConnError] = useState("");
  const [success, setSuccess] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      {success ? (
        <SuccessMessage />
      ) : (
        <ForgotPassForm connErr={setConnError} success={setSuccess} />
      )}
    </div>
  );
};

const SuccessMessage = () => {
  return (
    <>
      <p className="success-message">
        Your new password has been sent to your email address
      </p>
      <p>
        <Link to="auth/login">Log In?</Link>
      </p>
    </>
  );
};

const ForgotPassForm = (props) => {
  const { resetPassword } = useAuth();

  async function submitForm(values) {
    await resetPassword(values.email).then(
      () => {
        props.success(true);
        props.connErr("");
      },
      (error) => {
        let errorMessage = error.message;
        props.connErr(errorMessage);
        props.success(false);
      }
    );
  }

  return (
    <>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={resetPasswordValSchema}
        onSubmit={(values, { setSubmitting }) => {
          submitForm(values);
          setSubmitting(false);
        }}>
        <Form id="reset-password">
          <Input label="Email:" name="email" type="email" key="email" />
          <SubmitButton />
        </Form>
      </Formik>
      <div className="links-container">
        Do you need to
        <Link to="auth/signup">
          <strong> Sign Up?</strong>
        </Link>
        <br></br>
        or want to
        <Link to="auth/login">
          <strong> Log In?</strong>
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
