import React from "react";
import { useRef, useState } from "react";
import {
  Container,
  Heading,
  Separator,
  Label,
  Button,
  Input,
  Select,
  ErrorText,
} from "./AuthElements";
import Logo from "../logo/Logo";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupCaesarCipher() {
  const navigate = useNavigate();
  const secretKeyRef = useRef();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    if(secretKeyRef.current.value < 3) {
        return setError("Please set a secret key greater than or equal to 3!")
    }
    setError("");
    setLoading(true);
    await axios
      .post(
        "https://snxi84bp0e.execute-api.us-east-1.amazonaws.com/secret-key",
        {
          User_ID: currentUser.uid,
          Secret_Key: secretKeyRef.current.value,
        }
      )
      .catch(() => {
        setError("Failed to save information! Please try again!");
        return;
      });
    setLoading(false);
    navigate("/dashboard");
  }

  return (
    <div>
      <Container onSubmit={onSubmit}>
        <Logo />
        <br />
        <Heading>CAESAR CIPHER</Heading>
        <Separator />
        <br />
        <Label>Secret Key</Label>
        <Input type="number" ref={secretKeyRef} required />
        <ErrorText>{error}</ErrorText>
        <br />
        <Button disabled={loading} type="submit">
          Submit
        </Button>
      </Container>
      <br />
    </div>
  );
}

export default SignupCaesarCipher;
