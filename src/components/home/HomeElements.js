import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import { SiCodesandbox } from "react-icons/si";

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
  padding: 8px 18px;
  color: #000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 40px;
  font-size: 18px;
  font-weight: bold;
  z-index: 20;
`;

export const VideoContainer = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
  height: 640px;
  position: relative;
  z-index: 1;
`;

export const VideoBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #fff;
  opacity: 0.2;
`;

export const VideoComponent = styled.video`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
`;

export const Content = styled.div`
  width: 100%;
  background: #fff;
  opacity: 0.9;
  height: 50%;
  @media screen and (max-width: 960px) {
    height: 70%;
  }
`;

export const DarkContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 15%;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled.button`
  padding: 10px 30px;
  color: #fff;
  background: #222a9b;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin: auto;
  display: block;
  text-decoration: none;
  border-radius: 5px;
`;

export const H1 = styled.p`
  font-size: 60px;
  text-align: center;
  @media screen and (max-width: 960px) {
    font-size: 45px;
  }
`;

export const P = styled.p`
  color: #303030;
  font-size: 20px;
  text-align: center;
  font-weight: 900;
`;

export const BlackContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  position: relative;
  z-index: 1;
  background: #000;
`;

export const Wrapper1 = styled.div`
  flex: 40%;
`;
export const Wrapper2 = styled.div`
  flex: 50%;
`;

export const Image = styled.img`
  width: 100%;
`;

export const H2 = styled.p`
  padding: 20px;
  color: #fff;
  font-size: 60px;
  text-align: right;
`;
