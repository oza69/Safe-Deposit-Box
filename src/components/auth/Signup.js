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
import { isEmail, isPassword } from "./Validate";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if (!isEmail(emailRef.current.value)) {
      return setError("Please enter a valid email ID!");
    }

    if (!isPassword(passwordRef.current.value)) {
      return setError(
        "Please enter a password with a minimum length of 8 characters!"
      );
    }

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Please enter the same password to confirm!");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
      navigate("/signup-qna");
    } catch {
      setError("Account creation failed! Please use another email ID!");
    }
  }

  return (
    <div>
      <Container onSubmit={onSubmit}>
        <Logo />
        <br />
        <Heading>SIGN UP</Heading>
        <Separator />
        <br />
        <Label>Email ID</Label>
        <Input type="text" ref={emailRef} required />
        <Label>Password</Label>
        <Input type="password" ref={passwordRef} required />
        <Label>Confirm Password</Label>
        <Input type="password" ref={confirmPasswordRef} required />
        <ErrorText>{error}</ErrorText>
        <br />
        <Button disabled={loading} type="submit">
          Sign up
        </Button>
        <LinkText>
          Already have an account? &nbsp;<Link to="/login">Log in</Link>
        </LinkText>
      </Container>
      <br />
    </div>
  );
}

export default Signup;
