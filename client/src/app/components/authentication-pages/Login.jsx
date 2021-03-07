import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Link, useHistory } from "react-router-dom";

import { LoginValSchema } from "../form-components/Validation";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../form-components/Input";
import SubmitButton from "../form-components/SubmitButton";
import "./authentication.css";

const Login = () => {
  const [connError, setConnError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!success) return;

    var timer = setTimeout(() => {
      history.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [success, history]);

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      {success ? (
        <SuccessMessage />
      ) : (
        <LoginForm err={setConnError} success={setSuccess} />
      )}
    </div>
  );
};

const SuccessMessage = () => {
  return <p className="success-message">You have successfully logged in!</p>;
};

const LoginForm = (props) => {
  const { login } = useAuth();

  async function submitForm(values) {
    props.err("");
    await login(values.email, values.password).then(
      () => {
        localStorage.clear();
        props.success(true);
        props.err("");
      },
      (error) => {
        props.err(error.message);
        props.success(false);
      }
    );
  }

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginValSchema}
        onSubmit={(values, { setSubmitting }) => {
          submitForm(values);
          setSubmitting(false);
        }}>
        <Form id="login">
          <Input label="Email:" name="email" type="email" />
          <Input label="Password:" name="password" type="password" />
          <SubmitButton />
        </Form>
      </Formik>
      <div className="links-container">
        Do you need an account?
        <Link to="/auth/signup">
          <strong> Sign Up</strong>
        </Link>
        <br></br>
        or did you
        <Link to="/auth/forgot-password">
          <strong> forget your password?</strong>
        </Link>
      </div>
    </>
  );
};

export default Login;
