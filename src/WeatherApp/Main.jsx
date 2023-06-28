import React from "react";
import Box from "@mui/material/Box";
import MainWeatherInfo from "./MainWeatherInfo";
import ExtraWeatherInfo from "./ExtraWeatherInfo";
import HourlyWeatherInfo from "./HourlyWeatherInfo";
import Forecast from "./Forecast";

function Main(props) {
  const { cityName, isMobile } = props;

  const setShowErrorScreen = (value) => {
    props.showErrorScreen && props.showErrorScreen(value);
  };

  return (
    <main>
      <Box
        display={!isMobile && "flex"}
        style={{ justifyContent: "space-between", margin: "2rem" }}
      >
        <Box width={isMobile ? "100%" : "60%"}>
          <MainWeatherInfo
            cityName={cityName}
            showErrorScreen={setShowErrorScreen}
          />
          <HourlyWeatherInfo
            cityName={cityName}
            isMobile={isMobile}
            showErrorScreen={setShowErrorScreen}
          />
        </Box>
        <Box width={isMobile ? "100%" : "40%"}>
          <ExtraWeatherInfo
            cityName={cityName}
            showErrorScreen={setShowErrorScreen}
          />
        </Box>
      </Box>
      <Forecast cityName={cityName} showErrorScreen={setShowErrorScreen} />
    </main>
  );
}
export default Main;
