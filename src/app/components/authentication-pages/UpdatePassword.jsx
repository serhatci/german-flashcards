import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { UpdatePassValSchema } from "../form-components/Validation";
import { Link, useHistory } from "react-router-dom";
import Input from "../form-components/Input";
import "./authentication.css";
import SubmitButton from "../form-components/SubmitButton";
import { useAuth } from "../../contexts/AuthContext";

const UpdatePassword = () => {
  const { currentUser } = useAuth();
  const [connError, setConnError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      history.push("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, [success, history]);

  return (
    <div className="auth-container">
      <div className="auth-error">{connError}</div>
      <div className="update-profile-user">{currentUser.email}</div>
      {success ? (
        <SuccessMessage />
      ) : (
        <ProfileUpdateForm setConErr={setConnError} success={setSuccess} />
      )}
    </div>
  );
};

const SuccessMessage = () => {
  return (
    <p className="success-message">
      You have successfully updated your password!
    </p>
  );
};

const ProfileUpdateForm = (props) => {
  const { updatePassword } = useAuth();

  function submitForm(values) {
    props.setConnErr("");
    updatePassword(values.password)
      .then(() => props.success(true))
      .catch((err) => {
        props.setConnErr(err.message);
        props.success(false);
      });
  }
  return (
    <>
      <Formik
        initialValues={{
          password: "",
          passConfirm: "",
        }}
        validationSchema={UpdatePassValSchema}
        onSubmit={(values, { setSubmitting }) => {
          submitForm(values);
          setSubmitting(false);
        }}>
        <Form id="updatePassword">
          <Input label="New Password:" name="password" type="password" />
          <Input
            label="Confirm Password:"
            name="passConfirm"
            type="password"
          />
          <SubmitButton />
        </Form>
      </Formik>
      <div className="links-container">
        <Link to="/user-page">
          <strong>GO BACK</strong>
        </Link>
      </div>
    </>
  );
};

export default UpdatePassword;
