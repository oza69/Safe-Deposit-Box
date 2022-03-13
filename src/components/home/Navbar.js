import React from "react";
import {
  Nav,
  NavLink,
  NavBtn,
  NavBtnLink,
  LogoIcon,
  LogoContainer,
} from "./HomeElements";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
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

  function logIn() {
    if (typeof currentUser !== "undefined" && typeof box_id !== "undefined") {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <Nav>
        <NavLink to="/">
          <LogoContainer>
            <LogoIcon />
            &nbsp; SAFEDEPOSIT BOX
            <br />
          </LogoContainer>
        </NavLink>
        <NavBtn>
          <NavBtnLink onClick={signUp}>Sign Up</NavBtnLink>
          <NavBtnLink onClick={logIn}>Log In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
