import React from "react";
import Navbar from "../../navbar/Navbar";
import { useAuth } from "../context/AuthContext";
import { Heading, Box } from "./DashboardElements";

function Dashboard() {
  const { getBox } = useAuth();

  return (
    <div>
      <Navbar />
      <center>
        <Heading>Welcome to SafeDeposit Box</Heading>
        <Box>
          <h4>BOX NUMBER</h4>
          <br />
          <h1>{getBox()}</h1>
        </Box>
      </center>
    </div>
  );
}

export default Dashboard;
