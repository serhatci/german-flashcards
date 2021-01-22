import { Link } from "react-router-dom";
import "./authentication.css";

import Input from "../form-components/Input";
import Form from "../form-components/Form";
import FormButton from "../form-components/FormButton";

export default function ForgotPassword() {
  return (
    <div className="auth-container fade-in">
      <Form id="password-reset" method="post" legend="RESET PASSWORD">
        <Input label="Email" id="email" type="email" />
        <FormButton title="Submit" type="submit" />
      </Form>
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
}
