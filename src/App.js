import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import LoginQnA from "./components/auth/LoginQnA";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/dashboard/Dashboard";
import SignupQnA from "./components/auth/SignupQnA";
import SignupCaesarCipher from "./components/auth/SignupCaesarCipher";
import LoginCaesarCipher from "./components/auth/LoginCaesarCipher";
import WithdrawAmount from "./components/dashboard/WithdrawAmount";
import SendMessages from "./components/chat/SendMessages";
import DataVisualization from "./components/dashboard/DataVisualization";

import { AuthProvider } from "./components/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/login-qna" element={<LoginQnA />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/signup-qna" element={<SignupQnA />} exact />
        <Route
          path="/signup-caesar-cipher"
          element={<SignupCaesarCipher />}
          exact
        />
        <Route
          path="/login-caesar-cipher"
          element={<LoginCaesarCipher />}
          exact
        />
        <Route path="/dashboard" element={<Dashboard />} exact />
        <Route path="/withdraw-amount" element={<WithdrawAmount />} exact />
        <Route path="/send-message" element={<SendMessages />} exact />
        <Route
          path="/data-visualization"
          element={<DataVisualization />}
          exact
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
