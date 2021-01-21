import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

import "./authentication.css";
import Input from "../form-components/Input";
import Form from "../form-components/Form";
import FormButton from "../form-components/FormButton";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  return (
    <div className="auth-container fade-in">
      <Form id="login" method="post">
        <Input label="Email" id="email" type="email" />
        <Input label="Password" id="password" type="password" />
        <FormButton title="Submit" type="submit" />
      </Form>
    </div>
  );
}
