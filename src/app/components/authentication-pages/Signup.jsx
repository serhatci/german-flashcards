import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { SignupValSchema } from "../form-components/Validation";
import { Link, useHistory } from "react-router-dom";
import Input from "../form-components/Input";
import "./authentication.css";
import SubmitButton from "../form-components/SubmitButton";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const { signup } = useAuth();
  const [connError, setConnError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  // if success, redirect to home page
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history.push("/");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, history]);

  function signupForm() {
    return (
      <>
        {" "}
        <Formik
          initialValues={{
            email: "",
            password: "",
            passconfirm: "",
          }}
          validationSchema={SignupValSchema}
          onSubmit={(values, { setSubmitting }) => {
            signup(values.email, values.password).then(
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
          <Form id="signup">
            <Input label="Email:" name="email" type="email" key="email" />
            <Input label="Password:" name="password" type="password" />
            <Input
              label="Confirm Password:"
              name="passconfirm"
              type="password"
            />
            <SubmitButton />
          </Form>
        </Formik>
        <div className="links-container">
          Already have an account?{" "}
          <Link to="/login">
            <strong>Log In</strong>
          </Link>
        </div>
      </>
    );
  }

  function successMessage() {
    return <p className="success-message">You are successfully registered!</p>;
  }

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      {success ? successMessage() : signupForm()}
    </div>
  );
};

export default Signup;
