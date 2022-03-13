import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Container,
  Heading,
  Separator,
  Label,
  Input,
  Button,
  ErrorText,
  CipherText,
} from "./AuthElements";
import Logo from "../logo/Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function LoginCaesarCipher() {
  const navigate = useNavigate();
  const plainTextRef = useRef();
  const [error, setError] = useState("");
  const [cipherText, setCipherText] = useState("");
  const [plainText, setPlainText] = useState("");
  const { currentUser } = useAuth();

  async function onSubmit(event) {
    event.preventDefault();
    if (plainText !== plainTextRef.current.value) {
      setError("Incorrect! Please try again!");
    } else {
      navigate("/dashboard");
    }
  }

  useEffect(() => {
    async function getCipher() {
      await axios
        .post(
          "https://snxi84bp0e.execute-api.us-east-1.amazonaws.com/caesar-cipher",
          {
            User_ID: currentUser.uid,
          }
        )
        .then((response) => {
          setCipherText(response.data.body.Cipher_Text);
          setPlainText(response.data.body.Plain_Text);
        });
    }
    getCipher();
  }, []);

  return (
    <div>
      <Container onSubmit={onSubmit}>
        <Logo />
        <br />
        <Heading>DECODE CLUE</Heading>
        <Separator />
        <br />
        <Label>Cipher Text (Decrypt using Secret Key)</Label>
        <CipherText>{cipherText}</CipherText>
        <Label>Plain Text</Label>
        <Input type="text" ref={plainTextRef} required />
        <ErrorText>{error}</ErrorText>
        <br />
        <Button type="submit">Submit</Button>
      </Container>
    </div>
  );
}

export default LoginCaesarCipher;
