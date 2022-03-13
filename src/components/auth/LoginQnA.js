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
  Question,
} from "./AuthElements";
import Logo from "../logo/Logo";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function LoginQnA() {
  const navigate = useNavigate();
  const answerRef = useRef();
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { currentUser, setBox } = useAuth();

  async function onSubmit(event) {
    event.preventDefault();
    if (answer !== answerRef.current.value) {
      setError("Incorrect! Please try again!");
    } else {
      navigate("/login-caesar-cipher");
    }
  }

  useEffect(() => {
    async function getInfo() {
      await axios
        .post(
          "https://snxi84bp0e.execute-api.us-east-1.amazonaws.com/get-qna",
          {
            User_ID: currentUser.uid,
          }
        )
        .then((response) => {
          setQuestion(response.data.body.Question);
          setAnswer(response.data.body.Answer);
        });
      await axios
        .post(
          "https://snxi84bp0e.execute-api.us-east-1.amazonaws.com/get-box-number",
          {
            User_ID: currentUser.uid,
          }
        )
        .then((response) => {
          setBox(response.data.body.Box_ID);
        });
    }
    getInfo();
  }, []);

  return (
    <div>
      <Container onSubmit={onSubmit}>
        <Logo />
        <br />
        <Heading>SECURITY QUESTION</Heading>
        <Separator />
        <br />
        <Label>Question</Label>
        <Question>{question}</Question>
        <Label>Answer</Label>
        <Input type="text" ref={answerRef} required />
        <ErrorText>{error}</ErrorText>
        <br />
        <Button type="submit">Submit</Button>
      </Container>
    </div>
  );
}

export default LoginQnA;
