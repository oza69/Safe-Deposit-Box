import React from "react";
import Navbar from "./Navbar";
import video_clip from "./background.mp4";
import image from "./support.png";
import LexChat from "react-lex-plus";

import {
  VideoContainer,
  VideoBackground,
  VideoComponent,
  Content,
  DarkContent,
  H1,
  P,
  Button,
  ButtonContainer,
  BlackContainer,
  Wrapper1,
  Wrapper2,
  Image,
  H2,
} from "./HomeElements";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const navigate = useNavigate();
  const { currentUser, getBox } = useAuth();
  const box_id = getBox();

  function signUp() {
    if (typeof currentUser !== "undefined" && typeof box_id !== "undefined") {
      navigate("/dashboard");
    } else {
      navigate("/signup");
    }
  }
  return (
    <div>
      <Navbar />
      <center>
        <VideoContainer>
          <VideoBackground>
            <VideoComponent
              autoPlay
              loop
              muted
              src={video_clip}
              type="video/mp4"
            />
          </VideoBackground>
          <Content />
          <DarkContent>
            <br />
            <H1>Stay Connected With Us</H1>
            <br />
            <P>
              One stop solution to all your organtizational requirements
              including financial services and communication. <br />
              Get started today for a hassle-free work environment.
            </P>
            <br />
            <ButtonContainer>
              <Button onClick={signUp}>Sign Up Today</Button>
            </ButtonContainer>
            <br />
          </DarkContent>
        </VideoContainer>
      </center>
      <BlackContainer>
        <Wrapper1>
          <H2>
            We Offer <i> Support </i>
            <br />
          </H2>
          <LexChat
            botName="safeDeposit"
            IdentityPoolId="us-east-1:4a4e0f3c-7b5f-402a-934b-351e6b9d771d"
            placeholder="Enter message:"
            backgroundColor="#FFFFFF"
            height="430px"
            region="us-east-1"
            headerText="Chat with bot"
            headerStyle={{ backgroundColor: "#222a9b", fontSize: "30px" }}
            greeting={
              "Hello, how can I help? You can say things like 'help' to get more info"
            }
          />
        </Wrapper1>
        <Wrapper2>
          <Image src={image} />
        </Wrapper2>
      </BlackContainer>
      <div>
        <center>
          <br />
          <P>SAFEDEPOSIT BOX &copy; 2021. All rights are reserved.</P>
          <br />
          <br />
        </center>
      </div>
    </div>
  );
}

export default Home;
