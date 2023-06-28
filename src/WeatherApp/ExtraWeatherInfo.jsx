import React, { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { getCurrentWeatherData } from "../utils";

const StyledBox = styled(Box)`
  background-color: #ffffff4f;
  margin: 2rem;
  border-radius: 30px;
  padding: 1rem 2rem;
  justify-content: space-between;
  
`;

const SmallDiv = styled.div`
  background-color: #ffffff4f;
  margin: 10px;
  padding: 1rem;
  font-family: "Rajdhani";
  border-radius: 30px;
  margin-bottom: 2rem;
  
`;

const StyledTypography = styled(Typography)`
  font-family: "Rajdhani";
  display: flex;
  color: #ffffff;
   font-weight:bolder;
`;

function ExtraWeatherInfo(props) {
  const [weatherData, setWeatherData] = useState(null);

  function setShowErrorScreen(value) {
    props.showErrorScreen && props.showErrorScreen(value);
  }

  useEffect(() => {
    //fetch current weather data from weatherbit api
    const city = props.cityName ? props.cityName : "Delhi,IN"
    getCurrentWeatherData(city).then((response) => {
      if(response )
       setWeatherData(response);
      else
      setShowErrorScreen(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.cityName]);

  //set AQI description based on aqi level
  function AQIdescription(aqi) {
    let AQIdescription = "";

    if (aqi < 50) {
      AQIdescription = "Good";
    } else if (aqi < 150) {
      AQIdescription = "Moderately Polluted";
    } else {
      AQIdescription = "Highly Polluted";
    }

    return AQIdescription;
  }

  return (
    <StyledBox>
      <Box>
        <SmallDiv>
          {!weatherData ? (
            <Skeleton variant="text" width={50} height={50} />
          ) : (
            <StyledTypography fontSize={"1.4vw"} variant="h5">
              {weatherData.current.temp_c}{" "}
              {/* Added optional chaining operator */}
            </StyledTypography>
          )}
          {!weatherData ? (
            <Skeleton variant="text" width={200} height={30} />
          ) : (
            <StyledTypography fontSize={"2vw"} variant="h6">
              {AQIdescription(weatherData.current.uv)}
            </StyledTypography>
          )}
          <StyledTypography variant="h5" fontSize={"1.4vw"}>
            Air Quality
          </StyledTypography>
        </SmallDiv>
      </Box>

      <Box display="flex" justifyContent={"space-between"}>
        <Box height="100%" width="50%" marginTop={"1rem"}>
          <SmallDiv>
            {!weatherData ? (
              <Skeleton variant={"text"} width={"60px"} height={"30px"} />
            ) : (
              <StyledTypography
                paddingBottom="1rem"
                variant="h5"
                fontSize={"1.4vw"}
              >
                {weatherData && weatherData.current.wind_mph}m/h
              </StyledTypography>
            )}

            <StyledTypography variant="h5" fontSize={"1.4vw"}>
              Wind Speed
            </StyledTypography>
          </SmallDiv>

          <SmallDiv>
            {!weatherData ? (
              <Skeleton variant={"text"} width={"60px"} height={"30px"} />
            ) : (
              <StyledTypography
                paddingBottom="1rem"
                variant="h5"
                fontSize={"1.4vw"}
              >
                {weatherData && weatherData.current.humidity}%
              </StyledTypography>
            )}

            <StyledTypography variant="h5" fontSize={"1.4vw"}>
              Humidity
            </StyledTypography>
          </SmallDiv>

          <SmallDiv>
            {!weatherData ? (
              <Skeleton variant={"text"} width={"60px"} height={"30px"} />
            ) : (
              <StyledTypography
                paddingBottom="1rem"
                variant="h5"
                fontSize={"1.4vw"}
              >
                {weatherData && weatherData.current.uv}
              </StyledTypography>
            )}

            <StyledTypography variant="h5" fontSize={"1.4vw"}>
              UV Index
            </StyledTypography>
          </SmallDiv>
        </Box>

        <Box height="100%" width="50%" marginTop={"1rem"}>
          <SmallDiv>
            {!weatherData ? (
              <Skeleton variant={"text"} width={"60px"} height={"30px"} />
            ) : (
              <StyledTypography
                paddingBottom="1rem"
                variant="h5"
                fontSize={"1.4vw"}
              >
                {weatherData && weatherData.current.pressure_mb}mb
              </StyledTypography>
            )}

            <StyledTypography variant="h5" fontSize={"1.4vw"}>
              Pressure
            </StyledTypography>
          </SmallDiv>
          <SmallDiv>
            {!weatherData ? (
              <Skeleton variant={"text"} width={"60px"} height={"30px"} />
            ) : (
              <StyledTypography
                paddingBottom="1rem"
                variant="h5"
                fontSize={"1.4vw"}
              >
                {weatherData && weatherData.current.vis_km}km
              </StyledTypography>
            )}

            <StyledTypography variant="h5" fontSize={"1.4vw"}>
              Visibility
            </StyledTypography>
          </SmallDiv>
          <SmallDiv>
            {!weatherData ? (
              <Skeleton variant={"text"} width={"60px"} height={"30px"} />
            ) : (
              <StyledTypography
                paddingBottom="1rem"
                variant="h5"
                fontSize={"1.4vw"}
              >
                {weatherData && weatherData.current.precip_mm}mm
              </StyledTypography>
            )}

            <StyledTypography variant="h5" fontSize={"1.4vw"}>
              Precipitation
            </StyledTypography>
          </SmallDiv>
        </Box>
      </Box>
    </StyledBox>
  );
}

export default ExtraWeatherInfo;
