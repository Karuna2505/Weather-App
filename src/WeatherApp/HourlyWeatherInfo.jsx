import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { CardContent, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Grid } from "swiper";
import ButtonBase from "@mui/material/ButtonBase";
import { ReactComponent as Prev } from "../Assets/prev.svg";
import { ReactComponent as Next } from "../Assets/next.svg";
import { getCurrentWeatherData, getWeatherImageName } from "../utils";

import "swiper/css";
import "swiper/css/pagination";
import "../style.css";

const StyledBox = styled(Box)`
  background-color: #ffffff4f;
  margin: 4rem 2rem 2rem 2rem;
  border-radius: 30px;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledTypography = styled(Typography)`
  font-family: "Rajdhani";
`;
const Button = styled(ButtonBase)`
  opacity: 0.8;
  height: 60px;
  width: 60px;
  top: 50%;
  border-radius: 50% !important;
  position: absolute !important;
  transform: translateY(-50%);
  z-index: 2;
  &:hover {
    background-color: #b8c3e2;
  }
`;

const StyledSwiperSlide = styled(SwiperSlide)`
  border-radius: 30px;
`;

function HourlyWeatherInfo(props) {
  const [weatherData, setWeatherData] = useState(null);

  function setShowErrorScreen(value) {
    props.showErrorScreen && props.showErrorScreen(value);
  }
  useEffect(() => {
    //get weather forecast for 24 hours from weatherbit api
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
    <StyledBox>
      <>
        <Button direction={"prev"} id={"prev-button"} style={{ left: 0 }}>
          <Prev />
        </Button>
        <Button direction={"next"} id={"next-button"} style={{ right: 0 }}>
          <Next />
        </Button>
      </>
      <Swiper
        modules={[Navigation, Grid]}
        slidesPerView={props.isMobile ? "4" : "5"}
        navigation={{
          prevEl: `#prev-button`,
          nextEl: `#next-button`,
        }}
        spaceBetween={30}
        className="mySwiper"
        resizeObserver={true}
      >
        {weatherData &&
          weatherData.forecast &&
          weatherData.forecast.forecastday[0].hour.map((data, index) => (
           
            <StyledSwiperSlide>
              <Card key={data.ts} sx={{ minWidth: 100 }}>
                <StyledCardContent>
                  <StyledTypography mb={1}>
                    {data.time.substring(10)}
                  </StyledTypography>

                  <img
                    style={{
                      width: "2rem",
                      marginBottom: "1rem",
                    }}
                    src={getWeatherImageName(data.cloud).weatherImage}
                    alt="weather.png"
                  />

                  <StyledTypography>{data.temp_c}&deg;C</StyledTypography>
                </StyledCardContent>
              </Card>
            </StyledSwiperSlide>
          ))}
      </Swiper>
    </StyledBox>
  );
}

export default HourlyWeatherInfo;
