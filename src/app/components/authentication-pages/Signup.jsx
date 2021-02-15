import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { SignupValSchema } from "../form-components/Validation";
import { Link, useHistory } from "react-router-dom";
import Input from "../form-components/Input";
import "./authentication.css";
import SubmitButton from "../form-components/SubmitButton";
import { useAuth } from "../../contexts/AuthContext";

const Signup = () => {
  const { signup, logout, currentUser } = useAuth();
  const [connError, setConnError] = useState("");
  const [success, setSuccess] = useState(false);
  const [username, setUsername] = useState()
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) return

    try {
      addUserToDB()
      var timer = setTimeout(() => {
        history.push("/");
      }, 2000);
    } catch (err) {
      setConnError(err.message);
      setSuccess(false);
    }
    return () => clearTimeout(timer);

    function addUserToDB() {
      fetch("http://127.0.0.1:5000/api/add-user", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          id: currentUser.uid,
          username: username,
          email: currentUser.email,
        }).then(() => {
          localStorage.clear();
          setSuccess(true)
        })
      }).catch((err) => {
        logout()
        throw new Error(err)
      })
    }
  }, [history, username, currentUser, logout]);

  function signupForm() {

    async function submitForm(values, setSubmitting) {
      try {
        await signup(values.email, values.password)
        setUsername(values.username)
      } catch (err) {
        setConnError(err.message);
        setSuccess(false);
      };
      setSubmitting(true)
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
          onSubmit={(values, { setSubmitting }) => submitForm(values, { setSubmitting })
          }
        >
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
