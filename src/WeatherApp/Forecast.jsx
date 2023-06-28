import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import styled from "styled-components";

import Skeleton from "@mui/material/Skeleton";
import { getWeatherForecastData, daysOfWeek, getWeatherImageName } from "../utils";

const StyledDivMain = styled.div`
  width: 15%;
  display: flex;
  background-color: #ffffff4f;
  border-radius: 30px;
  margin: 4rem;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const StyledTypography = styled(Typography)`
  font-family: "Rajdhani";
  display: flex;
  color: #ffffff;
`;

const ContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

function MainWeatherInfo(props) {
  const { datetime, clouds, temp } = props;
  const date = new Date(datetime); // get current  date
  const currentDay = date.getDay();
  const currentDayName = daysOfWeek[currentDay]; //get current day

  return (
    <StyledDivMain>
      <StyledTypography variant="h4">{currentDayName}</StyledTypography>

      {!datetime ? (
        <Skeleton variant={"text"} width={"100px"} height={"100px"} />
      ) : (
        <StyledTypography fontSize={"1vw"}>{datetime}</StyledTypography>
      )}

      {!clouds ? (
        <Skeleton variant={"circular"} width={"100px"} height={"100px"} />
      ) : (
        <img
          style={{
            width: "5rem",
            marginBottom: "1rem",
          }}
          src={getWeatherImageName(clouds).weatherImage}
          alt="weather.png"
        />
      )}

      {!temp ? (
        <Skeleton variant={"text"} width={"150px"} height={"150px"} />
      ) : (
        <StyledTypography variant="h3" fontSize={"3.5vw"}>
          {temp}&deg;C
        </StyledTypography>
      )}
    </StyledDivMain>
  );
}

function Forecast(props) {
  const [weatherData, setWeatherData] = useState(null);

  function setShowErrorScreen(value) {
    props.showErrorScreen && props.showErrorScreen(value);
  }

  useEffect(() => {
    //get 7 day forecast data from weatherbit api
    const city = props.cityName ? props.cityName : "Delhi"
    getWeatherForecastData(city).then((response) => {
      if(response )
       setWeatherData(response);
      else
        setShowErrorScreen(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cityName]);

  return (
    <ContainerWrapper>
      {weatherData &&
        weatherData.forecast.forecastday.map((data) => (
          <MainWeatherInfo
            key={data.date}
            datetime={data.date}
            clouds={data.hour[0].cloud}
            temp={data.day.avgtemp_c}
          />
        ))}
    </ContainerWrapper>
  );
}
export default Forecast;
