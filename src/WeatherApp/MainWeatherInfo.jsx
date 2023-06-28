import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import styled from "styled-components";
import Skeleton from "@mui/material/Skeleton";
import {
  getCurrentWeatherData,
  daysOfWeek,
  getWeatherImageName,
} from "../utils";

const StyledDivMain = styled.div`
  background-color: #ffffff4f;
  margin: 2rem;
  border-radius: 30px;
  padding: 1rem 2rem;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTypography = styled(Typography)`
  font-family: "Rajdhani";
  display: flex;
  color: #ffffff;
`;

const StyledImage = styled.img`
  margin: 1.5rem 1.5rem 0 0;
  width: 10rem;
`;

function MainWeatherInfo(props) {
  const [weatherData, setWeatherData] = useState(null);
  const date = new Date();
  const currentDate = date.toDateString().substring(4, 10);
  const currentDay = date.getDay();

  const currentDayName = daysOfWeek[currentDay];
  const currentHours = date.getHours();
  const currentMinutes = date.getMinutes();

  function setShowErrorScreen(value) {
     props.showErrorScreen(value);
  }
  useEffect(() => {
    //get weather forecast from weatherbit api
    const city = props.cityName ? props.cityName : "Delhi,IN"
    getCurrentWeatherData(city).then((response) => {
      if(response )
       setWeatherData(response);
      else
       setShowErrorScreen(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cityName]);

  return (
    <StyledDivMain>
      <StyledDiv>
        <div>
          <StyledTypography fontSize={"3.5vw"} variant="h3">
            {currentDayName}
          </StyledTypography>
          <StyledTypography variant="h4" fontSize={"2.5vw"}>
            {currentDate}
          </StyledTypography>
        </div>
        <div>
          {!weatherData ? (
            <Skeleton variant={"circular"} width={"150px"} height={"150px"} />
          ) : (
            <StyledImage
              src={getWeatherImageName(weatherData.current.cloud).weatherImage}
              alt="weather image"
            />
          )}
        </div>
      </StyledDiv>

      <StyledDiv>
        <div>
          {!weatherData ? (
            <Skeleton variant={"text"} width={"200px"} height={"150px"} />
          ) : (
            <StyledTypography
              style={{ fontSize: "7vw" }}
              marginTop="2rem"
              variant="h1"
            >
              {weatherData && weatherData.current.temp_c}
              &deg;C
            </StyledTypography>
          )}

          {!weatherData ? (
            <Skeleton variant={"text"} width={"200px"} height={"50px"} />
          ) : (
            <StyledTypography variant="h4" fontSize={"2.5vw"}>
              {getWeatherImageName(weatherData.current.cloud).weatherDescription}
            </StyledTypography>
          )}
        </div>

        <Box marginTop={"auto"} overflow={"hidden"}>
          <StyledTypography
            fontSize={"3.5vw"}
            variant="h3"
            style={{ justifyContent: "end" }}
          >
            {currentHours}:{currentMinutes}
          </StyledTypography>

          {!weatherData ? (
            <Skeleton variant={"text"} width={"200px"} height={"100px"} />
          ) : (
            <StyledTypography
              fontSize={"4.5vw"}
              variant="h2"
              style={{
                justifyContent: "end",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                whiteSpace: "nowrap",
              }}
            >
              {weatherData && weatherData.location.name},
              {weatherData && weatherData.location.country.substring(0,2)}
            </StyledTypography>
          )}
        </Box>
      </StyledDiv>
    </StyledDivMain>
  );
}
export default MainWeatherInfo;
