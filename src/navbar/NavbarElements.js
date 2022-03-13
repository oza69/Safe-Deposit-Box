import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { SiCodesandbox } from "react-icons/si";
import { GoArrowRight } from "react-icons/go";

export const LogoContainer = styled.div`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  z-index: 100;
`;

export const LogoIcon = styled(SiCodesandbox)`
  font-size: 30px;
  vertical-align: middle;
  z-index: 100;
  color: #fff;
`;

export const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #5ce1e6;
  }
  font-size: 20px;
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled.button`
  border-radius: 4px;
  background: #fff;
  padding: 6px 18px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 40px;
`;

export const LogoutIcon = styled(GoArrowRight)`
  font-size: 22px;
  vertical-align: middle;
  color: #000;
`;
