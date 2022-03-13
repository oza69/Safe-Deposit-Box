import styled from "styled-components";
import { Link as LinkRouter } from "react-router-dom";

export const Heading = styled.p`
  color: black;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
  padding-top: 120px;
  padding-bottom: 60px;
`;

export const Box = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  border: 2px solid #222a9b;
  background: #222a9b;
  padding-top: 60px;
  padding-bottom: 60px;
  font-size: 20px;
  width: 50%;
  border-radius: 5px;
`;

export const Container = styled.form`
  max-width: 510px;
  margin: 0 auto;
  overflow: hidden;
  border: 2px solid black;
  padding: 40px;
  margin-top: 50px;
  border-radius: 5px;
`;

export const Label = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: black;
  font-weight: bold;
  font-size: 16px;
`;

export const ErrorText = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: #ff1616;
  font-size: 16px;
  font-weight: bold;
`;

export const SuccessText = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: #03989e;
  font-size: 16px;
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid #dddddd;
  background: #fdfcfb;
  outline: none;
  transition: border-color 0.5s;
  margin-left: auto;
  margin-right: auto;
  display: block;
  font-size: 16px;
`;

export const Amount = styled.p`
  margin-top: 5px;
  margin-bottom: 10px;
  color: black;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  border: 2px solid #dddddd;
  background: #ececec;
  padding: 10px;
`;

export const Button = styled.button`
  cursor: pointer;
  font-size: 1.1rem;
  color: white;
  background: #222a9b;
  border: 2px solid white;
  font-weight: 400;
  margin-top: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 5px;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  float: left;
  display: block;
  &:hover {
    color: white;
    background: #000770;
    border: 2px solid white;
  }
`;

export const Link = styled.button`
  color: #ff5757;
  font-weight: bolder;
  font-size: 16px;
  border: none;
  background: #fff;
  cursor: pointer;
`;
