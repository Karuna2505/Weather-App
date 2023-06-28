import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import DropDown from "./DropDown";
import icon from "../Assets/disaster.png";
import myProfile from "../Assets/my profile.png";

const Header1 = styled.header`
  background-color: #ffffff6f;
  display: flex;
  justify-content: space-between;
  height: 100px;
  padding-left: 30px;
  padding-right: 30px;
  box-shadow: 0 0 5px;
`;

const StyledImage = styled.img`
  display: flex;
  height: 60%;
  padding: 1.3rem 0.5rem 0 0;
`;

function Header(props) {
  const { cityname } = props;

  const searchClickHandler = (city) => {
    cityname(city);
  };

  return (
    <Header1>
      <div style={{ display: "flex" }}>
        <StyledImage src={icon} alt="icon" />
        <Typography
          fontSize={"3.5vw"}
          fontFamily={"Patrick Hand"}
          variant="h3"
          display={"flex"}
          alignItems={"center"}
        >
          WeatherApp
        </Typography>
      </div>
      <div style={{ display: "flex" }}>
        <DropDown searchClickHandlerCallback={searchClickHandler} />

        <StyledImage src={myProfile} alt="my-profile" />
      </div>
    </Header1>
  );
}

export default Header;
