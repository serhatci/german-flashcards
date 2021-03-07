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
        <SignupForm
          connErr={connError}
          setConnErr={setConnError}
          success={setSuccess}
        />
      )}
    </div>
  );
};

const SuccessMessage = () => {
  return <p className="success-message">You are successfully registered!</p>;
};

const SignupForm = (props) => {
  const { signup, currentUser, deleteUser } = useAuth();

  function submitForm(values, setSubmitting) {
    props.setConnErr("");
    signup(values.email, values.password)
      .then((newUser) => {
        localStorage.clear();
        addUserToDB(newUser.user, values.username);
      })
      .then(() => {
        props.success(true);
      })
      .catch((err) => {
        props.setConnErr(err.message);
        props.success(false);
      });

    if (props.connErr && currentUser.user) {
      deleteUser(currentUser.user);
    }
    setSubmitting(true);
  }

  async function addUserToDB(newUser, username) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        userID: newUser.uid,
        userName: username,
        email: newUser.email,
      }),
    };

    let response = await fetch("/api/add-user", options);
    if (!response.ok) throw new Error(response.message);
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
