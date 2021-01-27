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
  const history = useHistory();

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={resetPasswordValSchema}
        onSubmit={(values, { setSubmitting }) => {
          resetPassword(values.email)
            .then(setSuccess(true))
            .catch((error) => {
              let errorMessage = error.message;
              setConnError(errorMessage);
            });
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
        <Link to="/Login">
          <strong>Log In?</strong>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
