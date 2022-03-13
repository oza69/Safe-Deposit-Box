import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import moment from "moment";
import Navbar from "../../navbar/Navbar";
import { Button } from "@material-ui/core";
import { useAuth } from "../context/AuthContext";
import FormData from "form-data";

const userChatStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },

  messageArea: {
    height: "70vh",
    overflowY: "auto",
    width: "100%",
  },
  rightAlignMessage: {
    display: "flex",
    justifyContent: "end",
    float: "right",
  },
  backgroundTextLeft: {
    backgroundColor: "#ffd5c4",
    color: "#C93D05",
    borderRadius: "10px 10px 10px 0",
    padding: "8px",
  },
  backgroundTextRight: {
    backgroundColor: "#C9EBF6",
    color: "#1582F5",
    borderRadius: "10px 10px 0px 10px",
    padding: "8px",
  },
});

const SendMessages = () => {
  const stlyleClass = userChatStyles();
  const { currentUser, getBox } = useAuth();
  const [messages, setMessages] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = async () => {
    setOpenModal(!openModal);
  };

  const openPopUp = async () => {
    setOpenModal(true);
  };

  const fetchMessages = async () => {
    try {
      const url =
        "https://us-central1-serverless-project-331615.cloudfunctions.net/receiveMessages";
      const response = await axios.post(url, {
        subscriptionName: "subscription-" + getBox(),
      });
      if (response.status === 200) {
        if (response.data.userId !== currentUser.uid) {
          setMessages((prev) => [...prev, response.data]);
        }
      } else {
        alert("No New Messages in Box...");
      }
    } catch (err) {
      console.log("FETCH MESSAGE Error : ", err);
    }
  };

  const sendImage = async () => {
    try {
      const url =
        "https://us-central1-serverless-project-331615.cloudfunctions.net/uploadImage";
      let data = new FormData();
      data.append("filename", uploadedImage.name);
      data.append("content", uploadedImage);
      var response = await axios.post(url, data);
      if (response.data.statusCode === 200) {
        sendMessage();
      } else {
        alert("Image Not Matched. Can not send message...");
      }
      setOpenModal(false);
      setUploadedImage(null);
    } catch (err) {
      console.log("SEND IMAGE Error : ", err);
    }
  };

  const sendMessage = async () => {
    const userId = currentUser.uid;
    if (message === "") {
      return;
    }
    try {
      const url =
        "https://us-central1-serverless-project-331615.cloudfunctions.net/publishMessage";
      const msgTime = moment(new Date()).calendar().toString();
      const params = {
        message: { message, userId, msgTime },
        topic: "topic-" + getBox(),
      };
      await axios.post(url, params);
      setMessages((prev) => [...prev, { message, userId, msgTime }]);
      setMessage("");
    } catch (err) {
      console.log("SEND MESSAGE Error : ", err);
    }
  };

  return (
    <>
      <Modal isOpen={openModal} toggle={toggleModal}>
        <ModalHeader
          toggle={toggleModal}
          style={{ backgroundColor: "#222a9b", color: "#FFFFFF" }}
        >
          Upload Your Image Here
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              height: "auto",
              width: "470px",
              display: "block",
              justifyContent: "center",
              backgroundColor: "#9c9c9c21",
              marginRight: "150px",
            }}
          >
            <div>
              {uploadedImage && (
                <div>
                  <img
                    alt="sampleImage"
                    width={"250px"}
                    src={URL.createObjectURL(uploadedImage)}
                  />
                  <br />
                  <button onClick={() => setUploadedImage(null)}>Remove</button>
                  <button onClick={() => sendImage()}>Upload Image</button>
                </div>
              )}
              <br />

              <input
                type="file"
                name="uploadImage"
                accept="image/*"
                onChange={(event) => {
                  setUploadedImage(event.target.files[0]);
                }}
              />
            </div>
          </div>
        </ModalBody>
      </Modal>
      <div>
        <Navbar />
        <div>
          <Grid
            item
            xs={9}
            style={{
              marginLeft: "170px",
              marginRight: "150px",
            }}
          >
            <List className={stlyleClass.messageArea}>
              {messages &&
                messages.map((message, index) => {
                  return (
                    <ListItem
                      key={index}
                      className={
                        message.userId === currentUser.uid
                          ? stlyleClass.rightAlignMessage
                          : ""
                      }
                    >
                      <Grid
                        container
                        style={{
                          padding: "10px",
                          width: "max-content",
                          borderColor: "#2A32D8",
                        }}
                      >
                        <Grid item xs={12}>
                          <ListItemText
                            align={
                              message.userId === currentUser.uid
                                ? "right"
                                : "left"
                            }
                            primary={
                              <Typography
                                variant="h5"
                                style={{ fontWeight: "bold" }}
                              >
                                {message.message}
                              </Typography>
                            }
                            className={
                              message.userId === currentUser.uid
                                ? stlyleClass.backgroundTextRight
                                : stlyleClass.backgroundTextLeft
                            }
                          ></ListItemText>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: "-12px" }}>
                          <ListItemText
                            align={
                              message.userId === currentUser.uid
                                ? "right"
                                : "left"
                            }
                            secondary={
                              <Typography
                                variant="p"
                                style={{ color: "#C6C6C6", fontSize: "12px" }}
                                className="message-time"
                              >
                                {message.msgTime}
                              </Typography>
                            }
                          ></ListItemText>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
            </List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Enter Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  fullWidth
                  onKeyPress={(e) => (e.code === "Enter" ? openPopUp() : null)}
                />
              </Grid>
              <Grid xs={1} align="right">
                <Button
                  onClick={() => openPopUp()}
                  class="btn btn-outline-primary"
                >
                  Send
                </Button>
                <Button
                  onClick={() => fetchMessages()}
                  class="btn btn-outline-success"
                  style={{ marginTop: "-68px", marginLeft: "100px" }}
                >
                  Retrive
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default SendMessages;
