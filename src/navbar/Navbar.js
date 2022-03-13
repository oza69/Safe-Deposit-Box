import React from "react";
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
  LogoIcon,
  LogoContainer,
  LogoutIcon,
} from "./NavbarElements";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { removeBox, logout } = useAuth();

  function endSession() {
    logout();
    removeBox();
    navigate("/");
  }
  return (
    <>
      <Nav>
        <NavLink to="/dashboard">
          <LogoContainer>
            <LogoIcon />
            &nbsp; SAFEDEPOSIT BOX
            <br />
          </LogoContainer>
        </NavLink>
        <NavMenu>
          <NavLink to="/send-message">Send Message</NavLink>
          <NavLink to="/withdraw-amount">Withdraw Amount</NavLink>
          <NavLink to="/data-visualization">Data Visualization</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink onClick={endSession}>
            <LogoutIcon />
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
