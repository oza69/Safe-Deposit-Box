import React from "react";
import { useRef, useState, useEffect } from "react";
import Navbar from "../../navbar/Navbar";
import {
  Container,
  Label,
  ErrorText,
  SuccessText,
  Input,
  Button,
  Amount,
  Link,
} from "./DashboardElements";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function WithdrawAmount() {
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [transactionID, setTransactionID] = useState("");
  const withdrawAmountRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { currentUser, getBox } = useAuth();
  const [loading, setLoading] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  function downloadFile() {
    const element = document.createElement("a");
    const textFile = new Blob([
      JSON.stringify(
        {
          Transaction_ID: transactionID,
          User_ID: currentUser.uid,
          Box_ID: getBox(),
          Withdrawal_Amount: withdrawalAmount,
          Balance_Amount: currentBalance,
        },
        null,
        4
      ),
    ]);
    element.href = URL.createObjectURL(textFile);
    element.download = "Report.json";
    document.body.appendChild(element);
    element.click();
    setDisplaySuccess(false);
  }

  async function onSubmit(event) {
    setDisplaySuccess(false);
    setSuccess("");
    event.preventDefault();
    if (
      withdrawAmountRef.current.value <= 0 ||
      withdrawAmountRef.current.value > 1000
    ) {
      return setError("Incorrect Amount! Please re-enter value!");
    }
    setError("");
    setLoading(true);
    await axios
      .post(
        "https://snxi84bp0e.execute-api.us-east-1.amazonaws.com/withdraw-amount",
        {
          User_ID: currentUser.uid,
          Box_ID: getBox(),
          Amount: withdrawAmountRef.current.value,
        }
      )
      .then((response) => {
        if (response.data.body.success) {
          setDisplaySuccess(true);
          setCurrentBalance(response.data.body.Balance_Amount);
          setWithdrawalAmount(response.data.body.Withdrawal_Amount);
          setTransactionID(response.data.body.Transaction_ID);
          setSuccess("Amount Successfully Withdrawn!");
        } else {
          setError("Insufficient Balance! Please try again!");
        }
      });
    setLoading(false);
  }

  useEffect(() => {
    async function getInfo() {
      await axios
        .post(
          "https://snxi84bp0e.execute-api.us-east-1.amazonaws.com/get-balance",
          {
            Box_ID: getBox(),
          }
        )
        .then((response) => {
          setCurrentBalance(response.data.body.Balance_Amount);
        });
    }
    getInfo();
  }, []);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <Container onSubmit={onSubmit}>
        <Label>Current Balance</Label>
        <Amount>&#36;&nbsp;{currentBalance}</Amount>
        <br />
        <Label>Withdraw Amount</Label>
        <Input type="number" ref={withdrawAmountRef} required />
        <ErrorText>{error}</ErrorText>
        {displaySuccess && (
          <SuccessText>
            {success} &nbsp;
            <Link onClick={downloadFile}>Download Report</Link>
          </SuccessText>
        )}
        <br />
        <Button disabled={loading} type="submit">
          Submit
        </Button>
      </Container>
    </div>
  );
}

export default WithdrawAmount;
