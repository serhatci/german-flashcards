import { Link } from "react-router-dom";
import "./authentication.css";

import Input from "../form-components/Input";
import Form from "../form-components/Form";
import FormButton from "../form-components/FormButton";

export default function Signup() {
  return (
    <div className="auth-container fade-in">
      <Form id="sign-up" method="post" legend="SIGN UP">
        <Input label="Email" id="email" type="email" />
        <Input label="Password" id="password" type="password" />
        <Input
          label="Confirm Password"
          id="password-confirm"
          type="password"
        />
        <FormButton title="Submit" type="submit" />
      </Form>
      <div className="links-container">
        Already have an account?{" "}
        <Link to="/login">
          <strong>Log In</strong>
        </Link>
      </div>
    </div>
  );
}
