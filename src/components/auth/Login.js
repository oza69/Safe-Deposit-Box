import { useRef, useState } from "react";
import {
  Container,
  Heading,
  Separator,
  Label,
  Input,
  Button,
  ErrorText,
  LinkText,
  Link,
} from "./AuthElements";
import Logo from "../logo/Logo";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      navigate("/login-qna");
    } catch {
      setError("Account login failed! Please use valid credentials!");
    }
  }

  return (
    <div>
      <Container onSubmit={onSubmit}>
        <Logo />
        <br />
        <Heading>LOG IN</Heading>
        <Separator />
        <br />
        <Label>Email ID</Label>
        <Input type="text" ref={emailRef} required />
        <Label>Password</Label>
        <Input type="password" ref={passwordRef} required />
        <ErrorText>{error}</ErrorText>
        <br />
        <Button disabled={loading} type="submit">
          Log in
        </Button>
        <LinkText>
          Don't have an account yet? &nbsp;<Link to="/signup">Sign up</Link>
        </LinkText>
      </Container>
      <br />
    </div>
  );
}

export default Login;
