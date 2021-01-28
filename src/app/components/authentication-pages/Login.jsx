import { useState } from "react";
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
  const history = useHistory();

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginValSchema}
        onSubmit={(values, { setSubmitting }) => {
          login(values.email, values.password).then(
            () => {
              history.push("/");
              setConnError("");
            },
            (error) => {
              let errorMessage = error.message;
              setConnError(errorMessage);
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
      </div>
    </div>
  );
};

export default Login;
