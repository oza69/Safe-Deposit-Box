import React from "react";
import { useRef, useState, useEffect } from "react";
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

function SignupQnA() {
  const navigate = useNavigate();
  const question1Ref = useRef();
  const answer1Ref = useRef();
  const question2Ref = useRef();
  const answer2Ref = useRef();
  const question3Ref = useRef();
  const answer3Ref = useRef();
  const { currentUser, setBox } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    await axios
      .post("https://snxi84bp0e.execute-api.us-east-1.amazonaws.com/add-qna", {
        User_ID: currentUser.uid,
        Question_1: question1Ref.current.value,
        Answer_1: answer1Ref.current.value,
        Question_2: question2Ref.current.value,
        Answer_2: answer2Ref.current.value,
        Question_3: question3Ref.current.value,
        Answer_3: answer3Ref.current.value,
      })
      .catch(() => {
        setError("Failed to save information! Please try again!");
        return;
      });
    setLoading(false);
    navigate("/signup-caesar-cipher");
  }

  useEffect(() => {
    async function getBoxNumber() {
      await axios
        .post(
          "https://snxi84bp0e.execute-api.us-east-1.amazonaws.com/assign-box-number",
          {
            User_ID: currentUser.uid,
            Email_ID: currentUser.email,
          }
        )
        .then((response) => {
          setBox(response.data.body.Box_ID);
          createTopic(response.data.body.Box_ID);
        });
    }
    async function createTopic(boxId) {
      await axios
        .post(
          "https://us-central1-serverless-project-331615.cloudfunctions.net/createTopic",
          {
            topicName: boxId,
          }
        )
        .then((response) => {
          console.log(response);
        });
    }
    getBoxNumber();
  }, []);

  return (
    <div>
      <Container onSubmit={onSubmit}>
        <Logo />
        <br />
        <Heading>SECURITY QUESTIONS</Heading>
        <Separator />
        <br />
        <Label>Question 1</Label>
        <Select ref={question1Ref} required>
          <option value="In what city were you born?">
            In what city were you born?
          </option>
          <option value="What is the name of your first pet?">
            What is the name of your first pet?
          </option>
          <option value="What is your mother's maiden name?">
            What is your mother's maiden name?
          </option>
        </Select>
        <Label>Answer 1</Label>
        <Input type="text" ref={answer1Ref} required />
        <Label>Question 2</Label>
        <Select ref={question2Ref} required>
          <option value="What high school did you attend?">
            What high school did you attend?
          </option>
          <option value="What is your favorite food?">
            What is your favorite food?
          </option>
          <option value="What is the name of your favourite city?">
            What is the name of your favourite city?
          </option>
        </Select>
        <Label>Answer 2</Label>
        <Input type="text" ref={answer2Ref} required />
        <Label>Question 3</Label>
        <Select ref={question3Ref} required>
          <option value="What was your childhood nickname?">
            What was your childhood nickname?
          </option>
          <option value="In what city or town was your first job?">
            In what city or town was your first job?
          </option>
          <option value="What was your dream job as a child?">
            What was your dream job as a child?
          </option>
        </Select>
        <Label>Answer 3</Label>
        <Input type="text" ref={answer3Ref} required />
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

export default SignupQnA;
