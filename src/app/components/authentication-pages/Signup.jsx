import { useState } from "react";
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
  const history = useHistory();

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          passconfirm: "",
        }}
        validationSchema={SignupValSchema}
        onSubmit={(values, { setSubmitting }) => {
          signup(values.email, values.password).catch((error) => {
            let errorMessage = error.message;
            setConnError(errorMessage);
          });
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
    </div>
  );
};

export default Signup;
