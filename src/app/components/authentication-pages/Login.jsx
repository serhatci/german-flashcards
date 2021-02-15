import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { LoginValSchema } from "../form-components/Validation";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../form-components/Input";
import "./authentication.css";
import SubmitButton from "../form-components/SubmitButton";

const Login = () => {
  const { login } = useAuth();
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

  function loginForm() {
    return (<><Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginValSchema}
      onSubmit={(values, { setSubmitting }) => {
        login(values.email, values.password).then(
          () => {
            localStorage.clear()
            setSuccess(true)
            setConnError("");
          },
          (error) => {
            setConnError(error.message);
            setSuccess(false)
          }
        );
        setSubmitting(false);
      }}
    >
      <Form id="login">
        <Input label="Email:" name="email" type="email" />
        <Input label="Password:" name="password" type="password" />
        <SubmitButton />
      </Form>
    </Formik>
      <div className="links-container">
        Do you need an account?{" "}
        <Link to="/signup">
          <strong>Sign Up</strong>
        </Link>
        <br></br>
      or did you{" "}
        <Link to="/forgot-password">
          <strong>forget your password?</strong>
        </Link>
      </div></>)
  }

  function successMessage() {
    return <p className="success-message">You have successfully logged in!</p>;
  }

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      {success ? successMessage() : loginForm()}
    </div>
  );
};

export default Login;
