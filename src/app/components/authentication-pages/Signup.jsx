import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Link, useHistory } from "react-router-dom";

import { SignupValSchema } from "../form-components/Validation";
import Input from "../form-components/Input";
import SubmitButton from "../form-components/SubmitButton";
import { useAuth } from "../../contexts/AuthContext";
import "./authentication.css";

const Signup = () => {
  const [connError, setConnError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!success) return;

    var timer = setTimeout(() => {
      history.push("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [history, success]);

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      {success ? (
        <SuccessMessage />
      ) : (
        <SignupForm connErr={setConnError} success={setSuccess} />
      )}
    </div>
  );
};

const SuccessMessage = () => {
  return <p className="success-message">You are successfully registered!</p>;
};

const SignupForm = (props) => {
  const { signup, deleteUser } = useAuth();

  async function submitForm(values, setSubmitting) {
    props.connErr("");
    try {
      var newUser = await signup(values.email, values.password);
    } catch (err) {
      props.connErr(err.message);
      props.success(false);
    }

    if (!newUser.user) return;

    try {
      await addUserToDB(newUser.user, values.username);
    } catch (err) {
      await deleteUser(newUser.user);
      props.connErr(err.message);
      props.success(false);
    }

    setSubmitting(true);
  }

  async function addUserToDB(newUser, username) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: newUser.uid,
        username: username,
        email: newUser.email,
      }),
    };

    const response = await fetch(
      "http://127.0.0.1:5000/api/add-user",
      options
    );

    if (response.ok) {
      localStorage.clear();
      props.success(true);
    } else {
      const err = await response.json();
      throw new Error(err.message);
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          passConfirm: "",
        }}
        validationSchema={SignupValSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (values.username === "master") {
            return props.connErr("username master is already occupied :(");
          }
          submitForm(values, setSubmitting);
        }}>
        <Form id="signup">
          <Input label="User Name:" name="username" type="text" />
          <Input label="Email:" name="email" type="email" />
          <Input label="Password:" name="password" type="password" />
          <Input
            label="Confirm Password:"
            name="passConfirm"
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
};

export default Signup;
