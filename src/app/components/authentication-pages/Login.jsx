import { Link } from "react-router-dom";
import "./authentication.css";

import Input from "../form-components/Input";
import Form from "../form-components/Form";
import FormButton from "../form-components/FormButton";

export default function Login() {
  return (
    <div className="auth-container fade-in">
      <Form id="login" method="post" legend="LOG IN">
        <Input label="Email" id="email" type="email" />
        <Input label="Password" id="password" type="password" />
        <FormButton title="Submit" type="submit" />
      </Form>
      <div className="links-container">
        Do you need to{" "}
        <Link to="/signup">
          <strong>Sign Up?</strong>
        </Link>
        <br></br>
        or did you{" "}
        <Link to="/forgot-password">
          <strong>forget your password?</strong>
        </Link>
      </div>
    </div>
  );
}
